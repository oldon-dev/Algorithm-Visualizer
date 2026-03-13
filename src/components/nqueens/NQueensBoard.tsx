import clsx from "clsx";
import { NQueensBoardState } from "@/core/types/backtracking";

type Props = {
  board: NQueensBoardState;
};

export function NQueensBoard({ board }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1728] p-4 lg:p-6">
      <div
        className="grid w-fit overflow-hidden rounded-xl border border-white/10"
        style={{
          gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))`,
        }}
      >
        {board.flat().map((cell) => {
          const isDark = (cell.row + cell.col) % 2 === 1;

          return (
            <div
              key={`${cell.row}-${cell.col}`}
              className={clsx(
                "flex h-14 w-14 items-center justify-center border border-white/5 text-2xl transition",
                isDark ? "bg-[#13233a]" : "bg-[#0f1c2e]",
                cell.status === "active" && "bg-yellow-400/20",
                cell.status === "backtrack" && "bg-orange-400/20",
                cell.status === "solved" && "bg-cyan-400/20"
              )}
            >
              <span
                className={clsx(
                  "transition",
                  cell.hasQueen ? "opacity-100" : "opacity-0",
                  cell.status === "queen" && "text-emerald-300",
                  cell.status === "solved" && "text-cyan-200",
                  cell.status === "backtrack" && "text-orange-200",
                  !cell.hasQueen && "text-transparent"
                )}
              >
                ♛
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}