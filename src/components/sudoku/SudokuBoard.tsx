import { SudokuBoardState } from "@/core/types/backtracking";
import { SudokuCell } from "./SudokuCell";

type Props = {
  board: SudokuBoardState;
  onCellChange: (row: number, col: number, value: number | null) => void;
};

export function SudokuBoard({ board, onCellChange }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1728] p-4 lg:p-6">
      <div className="grid w-fit grid-cols-9 gap-0 overflow-hidden rounded-xl border border-white/10">
        {board.flat().map((cell) => {
          const thickTop = cell.row % 3 === 0 ? "border-t-2 border-t-sky-500/40" : "";
          const thickLeft = cell.col % 3 === 0 ? "border-l-2 border-l-sky-500/40" : "";
          const thickRight = cell.col === 8 ? "border-r-2 border-r-sky-500/40" : "";
          const thickBottom = cell.row === 8 ? "border-b-2 border-b-sky-500/40" : "";

          return (
            <div
              key={`${cell.row}-${cell.col}`}
              className={`${thickTop} ${thickLeft} ${thickRight} ${thickBottom}`}
            >
              <SudokuCell
                cell={cell}
                onChange={(value) => onCellChange(cell.row, cell.col, value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}