"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_NQUEENS_SIZE, DEFAULT_NQUEENS_SPEED } from "@/core/constants/nqueens";
import { getNQueensSteps } from "@/core/algorithms/backtracking";
import { BacktrackingAlgorithm, NQueensBoardState, NQueensStep } from "@/core/types/backtracking";
import { cloneNQueensBoard, createNQueensBoard } from "@/core/utils/nqueens";

export function useNQueensVisualizer(algorithm: BacktrackingAlgorithm) {
  const [size, setSize] = useState(DEFAULT_NQUEENS_SIZE);
  const [baseBoard, setBaseBoard] = useState<NQueensBoardState>(() =>
    createNQueensBoard(DEFAULT_NQUEENS_SIZE)
  );
  const [steps, setSteps] = useState<NQueensStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_NQUEENS_SPEED);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = useMemo(() => {
    if (steps.length > 0) return steps[currentStepIndex];

    return {
      board: baseBoard,
      description: "Choose a board size and press Solve.",
    };
  }, [steps, currentStepIndex, baseBoard]);

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const resetBoard = useCallback(
    (nextSize = size) => {
      stopPlayback();
      setSteps([]);
      setCurrentStepIndex(0);
      setBaseBoard(createNQueensBoard(nextSize));
    },
    [size, stopPlayback]
  );

  const solve = useCallback(() => {
    const computedSteps = getNQueensSteps(cloneNQueensBoard(baseBoard));
    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, [baseBoard]);

  const pause = useCallback(() => {
    stopPlayback();
  }, [stopPlayback]);

  const resume = useCallback(() => {
    if (steps.length === 0 || currentStepIndex >= steps.length - 1) return;
    setIsPlaying(true);
  }, [steps, currentStepIndex]);

  useEffect(() => {
    stopPlayback();
    setSteps([]);
    setCurrentStepIndex(0);
  }, [algorithm, stopPlayback]);

  useEffect(() => {
    resetBoard(size);
  }, [size, resetBoard]);

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
    board: currentStep.board,
    description: currentStep.description,
    size,
    setSize,
    speed,
    setSpeed,
    isPlaying,
    hasSteps: steps.length > 0,
    resetBoard,
    solve,
    pause,
    resume,
  };
}