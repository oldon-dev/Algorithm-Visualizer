import { SelectHTMLAttributes } from "react";
import clsx from "clsx";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: Props) {
  return (
    <select
      className={clsx(
        "w-full rounded-xl border border-white/10 bg-[#0c1728] px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-sky-500",
        className
      )}
      {...props}
    />
  );
}