"use client";

import { BacktrackingAlgorithm } from "@/core/types/backtracking";
import { getBacktrackingAlgorithmMeta } from "@/core/utils/sudoku";
import { useNQueensVisualizer } from "@/hooks/useNQueensVisualizer";
import { NQueensBoard } from "./NQueensBoard";
import { NQueensControls } from "./NQueensControls";
import { NQueensInfo } from "./NQueensInfo";

type Props = {
  algorithm: BacktrackingAlgorithm;
};

export function NQueensVisualizer({ algorithm }: Props) {
  const meta = getBacktrackingAlgorithmMeta(algorithm);

  const {
    board,
    description,
    size,
    setSize,
    speed,
    setSpeed,
    isPlaying,
    hasSteps,
    resetBoard,
    solve,
    pause,
    resume,
  } = useNQueensVisualizer(algorithm);

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

      <NQueensControls
        size={size}
        onSizeChange={setSize}
        speed={speed}
        onSpeedChange={setSpeed}
        isPlaying={isPlaying}
        hasSteps={hasSteps}
        onReset={() => resetBoard(size)}
        onSolve={solve}
        onPause={pause}
        onResume={resume}
      />

      <NQueensBoard board={board} />

      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-yellow-400/60" />
          Trying
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-400/60" />
          Placed Queen
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-orange-400/60" />
          Backtracking
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-cyan-400/60" />
          Solved
        </div>
      </div>

      <NQueensInfo algorithm={algorithm} description={description} size={size} />
    </section>
  );
}