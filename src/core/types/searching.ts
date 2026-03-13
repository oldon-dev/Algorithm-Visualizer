export type SearchingAlgorithm =
  | "linear"
  | "binary"
  | "jump"
  | "interpolation"
  | "exponential"
  | "ternary";

export interface SearchStep {
  array: number[];
  current?: number;
  found?: number;
  visited?: number[];
  left?: number;
  right?: number;
  mid?: number;
  description: string;
}

export interface SearchingAlgorithmMeta {
  value: SearchingAlgorithm;
  label: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  requiresSortedArray: boolean;
}