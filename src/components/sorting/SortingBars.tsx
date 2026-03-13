import clsx from "clsx";
import { SORTING_COLORS } from "@/core/constants/colors";

type Props = {
  values: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
};

export function SortingBars({
  values,
  comparing = [],
  swapping = [],
  sorted = [],
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1728] p-4 lg:p-6">
      <div className="flex h-[420px] items-end gap-2 overflow-hidden">
        {values.map((value, index) => {
          const isComparing = comparing.includes(index);
          const isSwapping = swapping.includes(index);
          const isSorted = sorted.includes(index);

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
                  "w-full rounded-t-md transition-all duration-150",
                  isSwapping && SORTING_COLORS.changing.bar,
                  !isSwapping && isComparing && SORTING_COLORS.comparing.bar,
                  !isSwapping && !isComparing && isSorted && SORTING_COLORS.sorted.bar,
                  !isSwapping && !isComparing && !isSorted && SORTING_COLORS.default.bar
                )}
                style={{ height: `${value}px` }}
              />
              <span className={clsx(" text-slate-400", labelsize)}>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}