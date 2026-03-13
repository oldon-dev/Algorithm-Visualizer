import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <main className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-10 2xl:px-16">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)]">
        <Sidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}