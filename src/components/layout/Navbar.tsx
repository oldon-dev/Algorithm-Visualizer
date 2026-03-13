import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/80 backdrop-blur-xl">
      <div className="w-full px-6 py-4 xl:px-10 2xl:px-16">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-white">
              Algorithm Visualizer
            </span>
            <span className="text-sm text-slate-400">
              Learn algorithms through motion
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm text-slate-300 transition hover:text-sky-400">
              Home
            </Link>
            <Link
              href="/algorithms"
              className="text-sm text-slate-300 transition hover:text-sky-400"
            >
              Algorithms
            </Link>
            <Link
              href="/algorithms/sorting/bubble"
              className="text-sm text-slate-300 transition hover:text-sky-400"
            >
              Sorting
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}