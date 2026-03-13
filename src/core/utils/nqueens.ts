import { NQueensBoardState } from "@/core/types/backtracking";

export function createNQueensBoard(size: number): NQueensBoardState {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => ({
      row,
      col,
      hasQueen: false,
      status: "idle" as const,
    }))
  );
}

export function cloneNQueensBoard(board: NQueensBoardState): NQueensBoardState {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function resetNQueensStatuses(board: NQueensBoardState): NQueensBoardState {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      status: cell.hasQueen ? "queen" : "idle",
    }))
  );
}