import { SudokuBoardState, SudokuStep } from "@/core/types/backtracking";
import { cloneSudokuBoard } from "@/core/utils/sudoku";

function isValid(board: SudokuBoardState, row: number, col: number, value: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i].value === value) return false;
    if (i !== row && board[i][col].value === value) return false;
  }

  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;

  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let c = boxColStart; c < boxColStart + 3; c++) {
      if ((r !== row || c !== col) && board[r][c].value === value) {
        return false;
      }
    }
  }

  return true;
}

function findNextEmpty(board: SudokuBoardState): { row: number; col: number } | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) {
        return { row, col };
      }
    }
  }
  return null;
}

function clearStatuses(board: SudokuBoardState) {
  for (const row of board) {
    for (const cell of row) {
      if (!cell.fixed) {
        cell.status = "idle";
      }
    }
  }
}

export function sudokuSolverSteps(inputBoard: SudokuBoardState): SudokuStep[] {
  const board = cloneSudokuBoard(inputBoard);
  const steps: SudokuStep[] = [];

  function pushStep(description: string) {
    steps.push({
      board: cloneSudokuBoard(board),
      description,
    });
  }

  function solve(): boolean {
    const nextEmpty = findNextEmpty(board);

    if (!nextEmpty) {
      for (const row of board) {
        for (const cell of row) {
          cell.status = "solved";
        }
      }

      pushStep("Sudoku solved successfully.");
      return true;
    }

    const { row, col } = nextEmpty;

    clearStatuses(board);
    board[row][col].status = "active";
    pushStep(`Trying values for cell (${row + 1}, ${col + 1}).`);

    for (let value = 1; value <= 9; value++) {
      if (!isValid(board, row, col, value)) {
        continue;
      }

      board[row][col].value = value;
      board[row][col].status = "filled";
      pushStep(`Placed ${value} at row ${row + 1}, column ${col + 1}.`);

      if (solve()) {
        return true;
      }

      board[row][col].value = null;
      board[row][col].status = "backtrack";
      pushStep(`Backtracking from row ${row + 1}, column ${col + 1}.`);
    }

    board[row][col].status = "backtrack";
    return false;
  }

  pushStep("Starting Sudoku backtracking solver.");
  solve();

  return steps;
}