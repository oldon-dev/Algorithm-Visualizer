import { GridCell, Position } from "@/core/types/pathfinding";

export const DEFAULT_ROWS = 18;
export const DEFAULT_COLS = 28;

export function createInitialGrid(
  rows = DEFAULT_ROWS,
  cols = DEFAULT_COLS
): GridCell[][] {
  const start: Position = { row: 4, col: 4 };
  const target: Position = { row: 10, col: 20 };

  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => {
      let type: GridCell["type"] = "empty";

      if (row === start.row && col === start.col) type = "start";
      if (row === target.row && col === target.col) type = "target";

      return { row, col, type };
    })
  );
}

export function cloneGrid(grid: GridCell[][]): GridCell[][] {
  return grid.map((row) => row.map((cell) => ({ ...cell })));
}

export function isSamePosition(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

export function findCellPosition(
  grid: GridCell[][],
  type: "start" | "target"
): Position | null {
  for (const row of grid) {
    for (const cell of row) {
      if (cell.type === type) {
        return { row: cell.row, col: cell.col };
      }
    }
  }
  return null;
}

export function getNeighbors(
  position: Position,
  grid: GridCell[][]
): Position[] {
  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
  ];

  return directions
    .map((direction) => ({
      row: position.row + direction.row,
      col: position.col + direction.col,
    }))
    .filter(
      (next) =>
        next.row >= 0 &&
        next.row < grid.length &&
        next.col >= 0 &&
        next.col < grid[0].length
    );
}

export function positionKey(position: Position): string {
  return `${position.row}-${position.col}`;
}

import { PATHFINDING_ALGORITHMS } from "@/core/constants/pathfinding";
import { PathfindingAlgorithm } from "@/core/types/pathfinding";

export function getPathfindingAlgorithmMeta(algorithm: PathfindingAlgorithm) {
  return PATHFINDING_ALGORITHMS.find((item) => item.value === algorithm)!;
}