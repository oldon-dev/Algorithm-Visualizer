import { bfsSteps } from "./bfs";
import { aStarSteps } from "./astar";
import { GridCell, PathfindingAlgorithm, PathfindingStep } from "@/core/types/pathfinding";

type PathfindingRunner = (grid: GridCell[][]) => PathfindingStep[];

const PATHFINDING_RUNNERS: Record<PathfindingAlgorithm, PathfindingRunner> = {
  bfs: bfsSteps,
  astar: aStarSteps,
};

export function getPathfindingSteps(
  algorithm: PathfindingAlgorithm,
  grid: GridCell[][]
): PathfindingStep[] {
  return PATHFINDING_RUNNERS[algorithm](grid);
}