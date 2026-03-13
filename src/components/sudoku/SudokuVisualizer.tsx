"use client";

import { BacktrackingAlgorithm } from "@/core/types/backtracking";
import { getBacktrackingAlgorithmMeta } from "@/core/utils/sudoku";
import { useSudokuVisualizer } from "@/hooks/useSudokuVisualizer";
import { SudokuBoard } from "./SudokuBoard";
import { SudokuControls } from "./SudokuControls";
import { SudokuInfo } from "./SudokuInfo";

type Props = {
  algorithm: BacktrackingAlgorithm;
};

export function SudokuVisualizer({ algorithm }: Props) {
  const meta = getBacktrackingAlgorithmMeta(algorithm);

  const {
    board,
    description,
    speed,
    setSpeed,
    isPlaying,
    hasSteps,
    setCellValue,
    loadSample,
    clearBoard,
    solve,
    pause,
    resume,
  } = useSudokuVisualizer(algorithm);

  return (
    <section className="flex flex-col gap-6">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
          Backtracking
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {meta.label}
        </h1>
      </div>

      <SudokuControls
        speed={speed}
        onSpeedChange={setSpeed}
        isPlaying={isPlaying}
        hasSteps={hasSteps}
        onLoadSample={loadSample}
        onClearBoard={clearBoard}
        onSolve={solve}
        onPause={pause}
        onResume={resume}
      />

      <SudokuBoard board={board} onCellChange={setCellValue} />

      <SudokuInfo algorithm={algorithm} description={description} />
    </section>
  );
}