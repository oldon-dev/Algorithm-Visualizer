import Link from "next/link";
import { Card } from "@/components/ui/Card";

const categories = [
  {
    title: "Sorting",
    description: "Understand how arrays are ordered through comparison and movement.",
    items: ["Bubble Sort", "Insertion Sort", "Merge Sort"],
    href: "/algorithms/sorting",
  },
  {
    title: "Path Finding",
    description: "Discover how algorithms search for efficient routes through a grid or graph.",
    items: ["A*", "Dijkstra", "BFS", "DFS"],
    href: "/algorithms",
  },
  {
    title: "Backtracking",
    description: "See how recursive exploration solves complex constraint-based problems.",
    items: ["Sudoku Solver", "N-Queens"],
    href: "/algorithms",
  },
];

export function CategoryPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
          Categories
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
          Built to grow beyond sorting
        </h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          The architecture is designed so new categories and algorithms can be added
          without rebuilding the whole app.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.title} href={category.href}>
            <Card className="h-full p-6 transition duration-200 hover:border-sky-500/40 hover:bg-white/[0.06]">
              <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {category.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs text-sky-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}