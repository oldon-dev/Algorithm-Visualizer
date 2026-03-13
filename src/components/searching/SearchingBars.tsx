import clsx from "clsx";
import { SEARCHING_COLORS } from "@/core/constants/colors";

type Props = {
  values: number[];
  current?: number;
  found?: number;
  visited?: number[];
  left?: number;
  right?: number;
  mid?: number;
};

export function SearchingBars({
  values,
  current,
  found,
  visited = [],
  left,
  right,
  mid,
}: Props) {
  const visitedSet = new Set(visited);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1728] p-4 lg:p-6">
      <div className="flex h-[420px] items-end gap-2 overflow-hidden">
        {values.map((value, index) => {
          const isFound = found === index;
          const isCurrent = current === index;
          const isVisited = visitedSet.has(index);
          const isBoundary = index === left || index === right || index === mid;

          //when array size is 60, text must be 8px. Scale inverseley proportional to the size of the array
          const labelsize = clsx(
            "text-slate-400",
            values.length <= 20 ? "text-sm" :
            values.length <= 40 ? "text-xs" :
            "text-[8px]"
          );

          return (
            <div
              key={`${index}-${value}`}
              className="flex flex-1 flex-col items-center justify-end gap-2"
            >
              <div
                className={clsx(
                  "w-full rounded-md transition-all duration-150",
                  isFound && SEARCHING_COLORS.found.bar,
                  !isFound && isCurrent && SEARCHING_COLORS.current.bar,
                  !isFound &&
                    !isCurrent &&
                    isBoundary &&
                    SEARCHING_COLORS.boundary.bar,
                  !isFound &&
                    !isCurrent &&
                    !isBoundary &&
                    isVisited &&
                    SEARCHING_COLORS.visited.bar,
                  !isFound &&
                    !isCurrent &&
                    !isBoundary &&
                    !isVisited &&
                    SEARCHING_COLORS.default.bar
                )}
                style={{ height: `${value}px` }}
              />
              <span className={clsx(" text-slate-400", labelsize)}>
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}