export const SUDOKU_SIZE = 9;
export const SUDOKU_BOX_SIZE = 3;

export const DEFAULT_SUDOKU_SPEED = 60;

export const SAMPLE_SUDOKU_PUZZLE: number[][] = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],

  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],

  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

export const EMPTY_SUDOKU_PUZZLE: number[][] = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => 0)
);