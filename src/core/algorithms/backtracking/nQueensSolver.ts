import { NQueensBoardState, NQueensStep } from "@/core/types/backtracking";
import { cloneNQueensBoard } from "@/core/utils/nqueens";

function clearStatuses(board: NQueensBoardState) {
  for (const row of board) {
    for (const cell of row) {
      cell.status = cell.hasQueen ? "queen" : "idle";
    }
  }
}

function isSafe(board: NQueensBoardState, row: number, col: number): boolean {
  const size = board.length;

  for (let r = 0; r < row; r++) {
    if (board[r][col].hasQueen) return false;
  }

  for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
    if (board[r][c].hasQueen) return false;
  }

  for (let r = row - 1, c = col + 1; r >= 0 && c < size; r--, c++) {
    if (board[r][c].hasQueen) return false;
  }

  return true;
}

export function nQueensSolverSteps(inputBoard: NQueensBoardState): NQueensStep[] {
  const board = cloneNQueensBoard(inputBoard);
  const steps: NQueensStep[] = [];
  const size = board.length;

  function pushStep(description: string) {
    steps.push({
      board: cloneNQueensBoard(board),
      description,
    });
  }

  function solve(row: number): boolean {
    if (row === size) {
      for (const rowCells of board) {
        for (const cell of rowCells) {
          if (cell.hasQueen) {
            cell.status = "solved";
          }
        }
      }

      pushStep("Solution found. All queens are placed safely.");
      return true;
    }

    for (let col = 0; col < size; col++) {
      clearStatuses(board);
      board[row][col].status = "active";
      pushStep(`Trying row ${row + 1}, column ${col + 1}.`);

      if (!isSafe(board, row, col)) {
        continue;
      }

      board[row][col].hasQueen = true;
      board[row][col].status = "queen";
      pushStep(`Placed a queen at row ${row + 1}, column ${col + 1}.`);

      if (solve(row + 1)) {
        return true;
      }

      board[row][col].hasQueen = false;
      board[row][col].status = "backtrack";
      pushStep(`Backtracking from row ${row + 1}, column ${col + 1}.`);
    }

    return false;
  }

  pushStep(`Starting N-Queens solver for a ${size}x${size} board.`);
  solve(0);

  return steps;
}