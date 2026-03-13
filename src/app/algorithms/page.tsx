import Link from "next/link";

import {
  BACKTRACKING_NAV_ITEMS,
  PATHFINDING_NAV_ITEMS,
  SORTING_NAV_ITEMS,
  SEARCHING_NAV_ITEMS,
  GRAPH_NAV_ITEMS
} from "@/core/constants/navigation";


const categories = [
  {
    name: "Sorting",
    algorithms: SORTING_NAV_ITEMS.map((item) => ({
      name: item.label,
      href: item.href,
    })),
  },
  {
    name: "Path Finding",
    algorithms: PATHFINDING_NAV_ITEMS.map((item) => ({
      name: item.label,
      href: item.href,
    })),
  },
  {
    name: "Backtracking",
    algorithms: BACKTRACKING_NAV_ITEMS.map((item) => ({
      name: item.label,
      href: item.href,
    })),
  },
    {
    name: "Searching",
    algorithms: SEARCHING_NAV_ITEMS.map((item) => ({
      name: item.label,
        href: item.href,
    })),
  },
    {
    name: "Graph",
    algorithms: GRAPH_NAV_ITEMS.map((item) => ({
        name: item.label,
        href: item.href,
    })),
   },
];

export default function AlgorithmsPage() {
  return (
    <main className="w-full px-6 py-10 xl:px-10 2xl:px-16">
      <div className="mb-12 max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
          Algorithm Library
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Explore categories and algorithms
        </h1>
      </div>

      <div className="space-y-12">
        {categories.map((category) => (
          <section key={category.name}>
            <div className="mb-5">
              <h2 className="text-2xl font-semibold text-white">{category.name}</h2>
              <div className="mt-3 h-px w-full bg-white/10" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.algorithms.map((algorithm) => (
                <Link
                  key={algorithm.name}
                  href={algorithm.href}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-200 transition hover:border-sky-500/40 hover:bg-sky-500/10 hover:text-sky-200"
                >
                  {algorithm.name}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}