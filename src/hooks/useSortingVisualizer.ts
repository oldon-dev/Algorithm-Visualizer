"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_ARRAY_SIZE, DEFAULT_SPEED } from "@/core/constants/sorting";
import { getSortingSteps } from "@/core/algorithms/sorting";
import { SortStep, SortingAlgorithm } from "@/core/types/sorting";
import { generateRandomArray } from "@/core/utils/array";

const INITIAL_ARRAY = Array.from({ length: DEFAULT_ARRAY_SIZE }, () => 60);

export function useSortingVisualizer(algorithm: SortingAlgorithm) {
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [baseArray, setBaseArray] = useState<number[]>(INITIAL_ARRAY);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = useMemo(() => {
    if (steps.length > 0) return steps[currentStepIndex];

    return {
      array: baseArray,
      description: "Generate an array and press Start.",
      sorted: [],
    } satisfies SortStep;
  }, [steps, currentStepIndex, baseArray]);

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const resetWithArray = useCallback(
    (newArray: number[]) => {
      stopPlayback();
      setBaseArray(newArray);
      setSteps([]);
      setCurrentStepIndex(0);
    },
    [stopPlayback]
  );

  const generateNewArray = useCallback(
    (size = arraySize) => {
      const newArray = generateRandomArray(size);
      resetWithArray(newArray);
    },
    [arraySize, resetWithArray]
  );

  const start = useCallback(() => {
    const computedSteps = getSortingSteps(algorithm, baseArray);
    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, [algorithm, baseArray]);

  const pause = useCallback(() => {
    stopPlayback();
  }, [stopPlayback]);

  const resume = useCallback(() => {
    if (steps.length === 0 || currentStepIndex >= steps.length - 1) return;
    setIsPlaying(true);
  }, [steps, currentStepIndex]);

  const reset = useCallback(() => {
    stopPlayback();
    setSteps([]);
    setCurrentStepIndex(0);
  }, [stopPlayback]);

  useEffect(() => {
    generateNewArray(DEFAULT_ARRAY_SIZE);
  }, [generateNewArray]);

  useEffect(() => {
    stopPlayback();
    setSteps([]);
    setCurrentStepIndex(0);
  }, [algorithm, stopPlayback]);

  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isPlaying, speed, steps]);

  return {
    arraySize,
    setArraySize,
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
  };
}