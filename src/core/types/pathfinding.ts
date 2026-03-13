export type CellType =
  | "empty"
  | "wall"
  | "start"
  | "target"
  | "visited"
  | "path";

export interface GridCell {
  row: number;
  col: number;
  type: CellType;
}

export interface Position {
  row: number;
  col: number;
}

export interface PathfindingStep {
  grid: GridCell[][];
  description: string;
}

export type PathfindingAlgorithm = "bfs" | "astar";

export interface PathfindingAlgorithmMeta {
  value: PathfindingAlgorithm;
  label: string;
  description: string;
  shortestPath: boolean;
  weighted: boolean;
  heuristic: string | null;
}