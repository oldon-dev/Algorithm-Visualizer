import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}