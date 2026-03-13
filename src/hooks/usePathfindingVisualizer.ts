"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getPathfindingSteps } from "@/core/algorithms/pathfinding";
import { GridCell, PathfindingAlgorithm, PathfindingStep } from "@/core/types/pathfinding";
import { cloneGrid, createInitialGrid } from "@/core/utils/pathfinding";

export function usePathfindingVisualizer(algorithm: PathfindingAlgorithm) {
  const [baseGrid, setBaseGrid] = useState<GridCell[][]>(() => createInitialGrid());
  const [steps, setSteps] = useState<PathfindingStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [tool, setTool] = useState<"wall" | "start" | "target">("wall");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = useMemo(() => {
    if (steps.length > 0) return steps[currentStepIndex];
    return {
      grid: baseGrid,
      description: "Edit the grid and press Start.",
    };
  }, [steps, currentStepIndex, baseGrid]);

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const clearSearchState = useCallback((grid: GridCell[][]) => {
    return grid.map((row) =>
      row.map((cell) => {
        if (cell.type === "visited" || cell.type === "path") {
          return { ...cell, type: "empty" as const };
        }
        return cell;
      })
    );
  }, []);

  const resetGrid = useCallback(() => {
    stopPlayback();
    setSteps([]);
    setCurrentStepIndex(0);
    setBaseGrid(createInitialGrid());
  }, [stopPlayback]);

  const updateCell = useCallback(
    (row: number, col: number) => {
      stopPlayback();
      setSteps([]);
      setCurrentStepIndex(0);

      setBaseGrid((prev) => {
        const next = clearSearchState(cloneGrid(prev));
        const current = next[row][col];

        if (tool === "wall") {
          if (current.type === "start" || current.type === "target") return next;
          current.type = current.type === "wall" ? "empty" : "wall";
          return next;
        }

        for (const rowCells of next) {
          for (const cell of rowCells) {
            if (cell.type === tool) {
              cell.type = "empty";
            }
          }
        }

        if (current.type !== "wall") {
          current.type = tool;
        }

        return next;
      });
    },
    [tool, stopPlayback, clearSearchState]
  );

  const start = useCallback(() => {
    const sanitizedGrid = clearSearchState(cloneGrid(baseGrid));
    setBaseGrid(sanitizedGrid);

    const computedSteps = getPathfindingSteps(algorithm, sanitizedGrid);

    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, [algorithm, baseGrid, clearSearchState]);

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
  }, [isPlaying, steps, speed]);

  return {
    grid: currentStep.grid,
    description: currentStep.description,
    isPlaying,
    hasSteps: steps.length > 0,
    speed,
    setSpeed,
    tool,
    setTool,
    updateCell,
    start,
    pause,
    resume,
    resetGrid,
  };
}