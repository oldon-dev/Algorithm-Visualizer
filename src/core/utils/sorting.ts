import { SORTING_ALGORITHMS } from "@/core/constants/sorting";
import { SortingAlgorithm } from "@/core/types/sorting";

export function getAlgorithmMeta(algorithm: SortingAlgorithm) {
  return SORTING_ALGORITHMS.find((item) => item.value === algorithm)!;
}