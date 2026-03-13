import { PathfindingAlgorithmMeta } from "@/core/types/pathfinding";

export const PATHFINDING_ALGORITHMS: PathfindingAlgorithmMeta[] = [
  {
    value: "bfs",
    label: "Breadth-First Search",
    description: "Explores the grid level by level and guarantees the shortest path in an unweighted grid.",
    shortestPath: true,
    weighted: false,
    heuristic: null,
  },
  {
    value: "astar",
    label: "A* Search",
    description: "Uses path cost plus a heuristic estimate to search more efficiently toward the target.",
    shortestPath: true,
    weighted: false,
    heuristic: "Manhattan distance",
  },
];