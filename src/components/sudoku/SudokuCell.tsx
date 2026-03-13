import clsx from "clsx";
import { SudokuCellState } from "@/core/types/backtracking";

type Props = {
  cell: SudokuCellState;
  onChange: (value: number | null) => void;
};

export function SudokuCell({ cell, onChange }: Props) {
  return (
    <input
      value={cell.value ?? ""}
      disabled={cell.fixed}
      onChange={(event) => {
        const raw = event.target.value.replace(/[^1-9]/g, "");
        onChange(raw ? Number(raw[0]) : null);
      }}
      maxLength={1}
      className={clsx(
        "h-12 w-12 border border-white/10 text-center text-lg font-semibold outline-none transition",
        "bg-[#0c1728] text-white",
        cell.fixed && "bg-[#13233a] text-sky-200",
        cell.status === "active" && "bg-yellow-400/20 text-yellow-200",
        cell.status === "filled" && "bg-emerald-400/20 text-emerald-200",
        cell.status === "backtrack" && "bg-orange-400/20 text-orange-200",
        cell.status === "solved" && "bg-cyan-400/20 text-cyan-200"
      )}
    />
  );
}