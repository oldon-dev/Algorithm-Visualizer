export type SortingAlgorithm = "bubble" | "insertion" | "merge" | "quick" | "radix" | "selection" | "heap" | "shell" | "counting" | "bucket" | "tim" | "cocktail" | "comb" | "gnome";


export interface SortStep {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  description: string;
}

export interface AlgorithmOption {
  value: SortingAlgorithm;
  label: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  stable: boolean;
}