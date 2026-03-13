import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="w-full px-6 py-10 xl:px-10 2xl:px-16">
      <div className="grid min-h-[calc(100vh-120px)] gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
            Interactive Algorithms
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl xl:text-7xl">
            Visualize how algorithms think, move, compare, and solve.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 xl:text-xl">
            Explore algorithms through animated, step-by-step visual explanations.
            Begin with sorting, then grow into path finding, recursion,
            backtracking, graphs, and more.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/algorithms">
              <Button>Explore Categories</Button>
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1728] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_35%)]" />
          <Image
            src="/images/hero-algorithms.png"
            alt="Abstract blue algorithm visualization"
            width={1400}
            height={900}
            className="relative z-10 h-full w-full rounded-2xl object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}