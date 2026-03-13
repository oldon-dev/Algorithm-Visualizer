"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getSearchingSteps } from "@/core/algorithms/searching";
import {
  DEFAULT_SEARCHING_ARRAY_SIZE,
  DEFAULT_SEARCHING_SPEED,
} from "@/core/constants/searching";
import { SearchStep, SearchingAlgorithm } from "@/core/types/searching";
import { getInitialSearchingState } from "@/core/utils/searching";

export function useSearchingVisualizer(algorithm: SearchingAlgorithm) {

  const [arraySize, setArraySize] = useState(DEFAULT_SEARCHING_ARRAY_SIZE);

  const initialState = useMemo(
    () => getInitialSearchingState(algorithm, arraySize),
    [algorithm, arraySize]
  );

  const [baseArray, setBaseArray] = useState<number[]>(initialState.array);
  const [target, setTarget] = useState<number>(initialState.target);
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SEARCHING_SPEED);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearPlaybackTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetPlaybackState = useCallback(() => {
    clearPlaybackTimer();
    setIsPlaying(false);
    setSteps([]);
    setCurrentStepIndex(0);
  }, [clearPlaybackTimer]);

  const generateNewArray = useCallback(() => {
    const nextState = getInitialSearchingState(algorithm, arraySize);
  
    clearPlaybackTimer();
    setIsPlaying(false);
    setBaseArray(nextState.array);
    setTarget(nextState.target);
    setSteps([]);
    setCurrentStepIndex(0);
  }, [algorithm, arraySize, clearPlaybackTimer]);

  const updateArraySize = useCallback(
    (nextSize: number) => {
      const nextState = getInitialSearchingState(algorithm, nextSize);
  
      clearPlaybackTimer();
      setIsPlaying(false);
      setArraySize(nextSize);
      setBaseArray(nextState.array);
      setTarget(nextState.target);
      setSteps([]);
      setCurrentStepIndex(0);
    },
    [algorithm, clearPlaybackTimer]
  );

  

  const start = useCallback(() => {
    const computedSteps = getSearchingSteps(algorithm, baseArray, target);

    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(computedSteps.length > 1);
  }, [algorithm, baseArray, target]);

  const pause = useCallback(() => {
    clearPlaybackTimer();
    setIsPlaying(false);
  }, [clearPlaybackTimer]);

  const resume = useCallback(() => {
    if (steps.length === 0 || currentStepIndex >= steps.length - 1) {
      return;
    }

    setIsPlaying(true);
  }, [currentStepIndex, steps.length]);

  const reset = useCallback(() => {
    clearPlaybackTimer();
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, [clearPlaybackTimer]);

  useEffect(() => {
    const nextState = getInitialSearchingState(algorithm, arraySize);
  
    clearPlaybackTimer();
    setIsPlaying(false);
    setBaseArray(nextState.array);
    setTarget(nextState.target);
    setSteps([]);
    setCurrentStepIndex(0);
  }, [algorithm, arraySize, clearPlaybackTimer]);

  useEffect(() => {
    clearPlaybackTimer();

    if (!isPlaying || steps.length === 0) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearPlaybackTimer();
          setIsPlaying(false);
          return prev;
        }

        return prev + 1;
      });
    }, speed);

    return () => clearPlaybackTimer();
  }, [clearPlaybackTimer, isPlaying, speed, steps]);

  useEffect(() => {
    return () => clearPlaybackTimer();
  }, [clearPlaybackTimer]);

  const currentStep = useMemo<SearchStep>(() => {
    if (steps.length === 0) {
      return {
        array: [...baseArray],
        description: "Generate an array and start the search",
      };
    }

    return steps[currentStepIndex] ?? steps[steps.length - 1];
  }, [baseArray, currentStepIndex, steps]);

  return {
    baseArray,
    arraySize,
    setArraySize: updateArraySize,
    target,
    setTarget,
    speed,
    setSpeed,
    currentStep,
    currentStepIndex,
    totalSteps: steps.length,
    isPlaying,
    generateNewArray,
    start,
    pause,
    resume,
    reset,
    resetPlaybackState,
  };
}