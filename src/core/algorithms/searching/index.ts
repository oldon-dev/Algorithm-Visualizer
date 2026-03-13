import { SearchingAlgorithm } from "@/core/types/searching";
import { binarySearchSteps } from "./binarySearch";
import { linearSearchSteps } from "./linearSearch";
import { jumpSearchSteps } from "./jumpSearch";
import { interpolationSearchSteps } from "./interpolationSearch";
import { exponentialSearchSteps } from "./exponentialSearch";
import { ternarySearchSteps } from "./ternarySearch";

export function getSearchingSteps(
  algorithm: SearchingAlgorithm,
  array: number[],
  target: number
) {
  switch (algorithm) {
    case "linear":
      return linearSearchSteps(array, target);
    case "binary":
      return binarySearchSteps(array, target);
    case "jump":
      return jumpSearchSteps(array, target);
    case "interpolation":
      return interpolationSearchSteps(array, target);
    case "exponential":
        return exponentialSearchSteps(array, target);
    case "ternary":
        return ternarySearchSteps(array, target);



    default:
      throw new Error(`Unknown searching algorithm: ${algorithm}`);
  }
}