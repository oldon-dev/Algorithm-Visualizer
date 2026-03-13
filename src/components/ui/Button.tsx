import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={clsx(
        "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-sky-500 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.18)] hover:bg-sky-400",
        variant === "secondary" &&
          "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
        variant === "ghost" &&
          "bg-transparent text-slate-300 hover:bg-white/5 hover:text-white",
        className
      )}
      {...props}
    />
  );
}