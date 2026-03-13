"use client";

import { PathfindingControls } from "./PathfindingControls";
import { PathfindingGrid } from "./PathfindingGrid";
import { Card } from "@/components/ui/Card";
import { usePathfindingVisualizer } from "@/hooks/usePathfindingVisualizer";
import { PathfindingAlgorithm } from "@/core/types/pathfinding";
import { getPathfindingAlgorithmMeta } from "@/core/utils/pathfinding";
import { PATHFINDING_COLORS } from "@/core/constants/colors";

type Props = {
  algorithm: PathfindingAlgorithm;
};

export function PathfindingVisualizer({ algorithm }: Props) {
  const meta = getPathfindingAlgorithmMeta(algorithm);

  const {
    grid,
    description,
    isPlaying,
    hasSteps,
    speed,
    setSpeed,
    tool,
    setTool,
    updateCell,
    start,
    pause,
    resume,
    resetGrid,
  } = usePathfindingVisualizer(algorithm);

  return (
    <section className="flex flex-col gap-6">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
          Path Finding
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {meta.label}
        </h1>
      </div>

      <PathfindingControls
        speed={speed}
        onSpeedChange={setSpeed}
        tool={tool}
        onToolChange={setTool}
        isPlaying={isPlaying}
        hasSteps={hasSteps}
        onStart={start}
        onPause={pause}
        onResume={resume}
        onReset={resetGrid}
      />

      <PathfindingGrid grid={grid} tool={tool} onCellClick={updateCell} />

      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${PATHFINDING_COLORS.empty.legend}`} />
          Empty
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${PATHFINDING_COLORS.wall.legend}`} />
          Wall
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${PATHFINDING_COLORS.start.legend}`} />
          Start
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${PATHFINDING_COLORS.target.legend}`} />
          Target
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${PATHFINDING_COLORS.visited.legend}`} />
          Visited
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${PATHFINDING_COLORS.path.legend}`} />
          Path
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
        <Card className="p-5">
          <h3 className="text-lg font-semibold text-white">Current Step</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-slate-400">Shortest Path</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {meta.shortestPath ? "Yes" : "No"}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-slate-400">Weighted</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {meta.weighted ? "Yes" : "No"}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-slate-400">Heuristic</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {meta.heuristic ?? "None"}
          </p>
        </Card>
      </div>
    </section>
  );
}