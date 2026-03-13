export const SORTING_COLORS = {
  default: {
    bar: "bg-blue-700",
    legend: "bg-blue-700",
  },
  comparing: {
    bar: "bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.22)]",
    legend: "bg-yellow-400",
  },
  changing: {
    bar: "bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.28)]",
    legend: "bg-orange-400",
  },
  sorted: {
    bar: "bg-cyan-400",
    legend: "bg-cyan-400",
  },
};

export const PATHFINDING_COLORS = {
  empty: {
    cell: "bg-[#13233a] hover:bg-[#1a314f]",
    legend: "bg-[#13233a]",
  },
  wall: {
    cell: "bg-slate-900",
    legend: "bg-slate-900",
  },
  start: {
    cell: "bg-emerald-400",
    legend: "bg-emerald-400",
  },
  target: {
    cell: "bg-rose-400",
    legend: "bg-rose-400",
  },
  visited: {
    cell: "bg-yellow-400",
    legend: "bg-yellow-400",
  },
  path: {
    cell: "bg-cyan-400",
    legend: "bg-cyan-400",
  },
};

export const SEARCHING_COLORS = {
  default: { bar: "bg-sky-500/80", legend: "bg-sky-500" },
  visited: { bar: "bg-slate-500/80", legend: "bg-slate-500" },
  current: { bar: "bg-amber-400/90", legend: "bg-amber-400" },
  boundary: { bar: "bg-cyan-400/90", legend: "bg-cyan-400" },
  found: { bar: "bg-emerald-400/90", legend: "bg-emerald-400" },
};

export const GRAPH_COLORS = {
  defaultNode: {
    fill: "fill-sky-500/80",
    legend: "bg-sky-500",
  },
  visitedNode: {
    fill: "fill-slate-500/90",
    legend: "bg-slate-500",
  },
  currentNode: {
    fill: "fill-emerald-400/95",
    legend: "bg-emerald-400",
  },
  edge: {
    stroke: "stroke-slate-600",
    legend: "bg-slate-600",
  },
  activeEdge: {
    stroke: "stroke-amber-400",
    legend: "bg-amber-400",
  },
};