"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  BACKTRACKING_NAV_ITEMS,
  PATHFINDING_NAV_ITEMS,
  SORTING_NAV_ITEMS,
  SEARCHING_NAV_ITEMS,
  GRAPH_NAV_ITEMS
} from "@/core/constants/navigation";

const navigation = [
  {
    category: "Sorting",
    items: SORTING_NAV_ITEMS,
  },
  {
    category: "Path Finding",
    items: PATHFINDING_NAV_ITEMS,
  },
  {
    category: "Backtracking",
    items: BACKTRACKING_NAV_ITEMS,
  },
    {
    category: "Searching",
    items: SEARCHING_NAV_ITEMS,
    },
    {
    category: "Graph",
    items: GRAPH_NAV_ITEMS,
     },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm xl:sticky xl:top-24">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Navigation
        </p>
        <h2 className="mt-2 text-lg font-semibold text-white">Algorithms</h2>
      </div>

      <div className="space-y-6">
        {navigation.map((section) => (
          <div key={section.category}>
            <p className="mb-3 text-sm font-medium text-slate-400">{section.category}</p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={clsx(
                      "block rounded-xl px-3 py-2 text-sm transition",
                      isActive
                        ? "bg-sky-500/15 text-sky-300"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}