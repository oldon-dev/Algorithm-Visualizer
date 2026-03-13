import { SAMPLE_SUDOKU_PUZZLE } from "@/core/constants/sudoku";
import { BacktrackingAlgorithm } from "@/core/types/backtracking";
import { BACKTRACKING_ALGORITHMS } from "@/core/constants/backtracking";
import { SudokuBoardState } from "@/core/types/backtracking";

export function createSudokuBoard(initialGrid: number[][] = SAMPLE_SUDOKU_PUZZLE): SudokuBoardState {
  return initialGrid.map((row, rowIndex) =>
    row.map((value, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      value: value === 0 ? null : value,
      fixed: value !== 0,
      status: "idle",
    }))
  );
}

export function cloneSudokuBoard(board: SudokuBoardState): SudokuBoardState {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function resetSudokuStatuses(board: SudokuBoardState): SudokuBoardState {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      status: cell.fixed ? "idle" : "idle",
    }))
  );
}

export function boardToNumberGrid(board: SudokuBoardState): number[][] {
  return board.map((row) => row.map((cell) => cell.value ?? 0));
}

export function getBacktrackingAlgorithmMeta(algorithm: BacktrackingAlgorithm) {
  return BACKTRACKING_ALGORITHMS.find((item) => item.value === algorithm)!;
}