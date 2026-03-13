"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_SUDOKU_SPEED } from "@/core/constants/sudoku";
import { getSudokuSteps } from "@/core/algorithms/backtracking";
import { BacktrackingAlgorithm, SudokuBoardState, SudokuStep } from "@/core/types/backtracking";
import { cloneSudokuBoard, createSudokuBoard } from "@/core/utils/sudoku";

export function useSudokuVisualizer(algorithm: BacktrackingAlgorithm) {
  const [baseBoard, setBaseBoard] = useState<SudokuBoardState>(() => createSudokuBoard());
  const [steps, setSteps] = useState<SudokuStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SUDOKU_SPEED);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = useMemo(() => {
    if (steps.length > 0) return steps[currentStepIndex];

    return {
      board: baseBoard,
      description: "Edit the puzzle or load the sample board, then press Solve.",
    };
  }, [steps, currentStepIndex, baseBoard]);

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const setCellValue = useCallback(
    (row: number, col: number, value: number | null) => {
      stopPlayback();
      setSteps([]);
      setCurrentStepIndex(0);

      setBaseBoard((prev) => {
        const next = cloneSudokuBoard(prev);
        const cell = next[row][col];

        if (cell.fixed) return next;

        cell.value = value;
        cell.status = "idle";

        return next;
      });
    },
    [stopPlayback]
  );

  const loadSample = useCallback(() => {
    stopPlayback();
    setSteps([]);
    setCurrentStepIndex(0);
    setBaseBoard(createSudokuBoard());
  }, [stopPlayback]);

  const clearBoard = useCallback(() => {
    stopPlayback();
    setSteps([]);
    setCurrentStepIndex(0);
    setBaseBoard(
      createSudokuBoard(
        Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0))
      )
    );
  }, [stopPlayback]);

  const solve = useCallback(() => {
    const computedSteps = getSudokuSteps(baseBoard);
    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, [algorithm, baseBoard]);

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
    speed,
    setSpeed,
    isPlaying,
    hasSteps: steps.length > 0,
    setCellValue,
    loadSample,
    clearBoard,
    solve,
    pause,
    resume,
  };
}