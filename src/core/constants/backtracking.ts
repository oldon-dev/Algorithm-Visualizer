import { BacktrackingAlgorithmMeta } from "@/core/types/backtracking";

export const BACKTRACKING_ALGORITHMS: BacktrackingAlgorithmMeta[] = [
  {
    value: "sudoku",
    label: "Sudoku Solver",
    description: "Uses backtracking to test valid digits and retreat when a choice leads to a dead end.",
    technique: "Backtracking",
    guaranteesSolution: true,
  },
  {
  value: "nqueens",
  label: "N-Queens",
  description: "Places queens row by row and backtracks whenever two queens threaten each other.",
  technique: "Backtracking",
  guaranteesSolution: true,
},
];