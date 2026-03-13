export type BacktrackingAlgorithm = "sudoku" | "nqueens";

export interface BacktrackingAlgorithmMeta {
  value: BacktrackingAlgorithm;
  label: string;
  description: string;
  technique: string;
  guaranteesSolution: boolean;
}

export interface SudokuCellState {
  row: number;
  col: number;
  value: number | null;
  fixed: boolean;
  status: "idle" | "active" | "filled" | "backtrack" | "solved";
}

export type SudokuBoardState = SudokuCellState[][];

export interface SudokuStep {
  board: SudokuBoardState;
  description: string;
}

export interface NQueensCellState {
  row: number;
  col: number;
  hasQueen: boolean;
  status: "idle" | "active" | "queen" | "backtrack" | "solved";
}

export type NQueensBoardState = NQueensCellState[][];

export interface NQueensStep {
  board: NQueensBoardState;
  description: string;
}