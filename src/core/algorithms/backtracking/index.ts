import { sudokuSolverSteps } from "./sudokuSolver";
import { nQueensSolverSteps } from "./nQueensSolver";
import {
  BacktrackingAlgorithm,
  SudokuBoardState,
  SudokuStep,
  NQueensBoardState,
  NQueensStep,
} from "@/core/types/backtracking";

export function getSudokuSteps(board: SudokuBoardState): SudokuStep[] {
  return sudokuSolverSteps(board);
}

export function getNQueensSteps(board: NQueensBoardState): NQueensStep[] {
  return nQueensSolverSteps(board);
}

export const BACKTRACKING_RUNNERS = {
  sudoku: sudokuSolverSteps,
  nqueens: nQueensSolverSteps,
} as const;

export type BacktrackingRunnerMap = typeof BACKTRACKING_RUNNERS;