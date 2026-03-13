import { SortingAlgorithm, SortStep } from "@/core/types/sorting";
import { bubbleSortSteps } from "./bubbleSort";
import { insertionSortSteps } from "./insertionSort";
import { mergeSortSteps } from "./mergeSort";
import { quickSortSteps } from "./quickSort";
import { radixSortSteps } from "./radixSort";
import { selectionSortSteps } from "./selectionSort";
import { heapSortSteps } from "./heapSort";
import { shellSortSteps } from "./shellSort";
import { countingSortSteps } from "./countingSort";
import { bucketSortSteps } from "./bucketSort";
import { timSortSteps } from "./timSort";
import { cocktailShakerSortSteps } from "./cocktailShakerSort";
import { combSortSteps } from "./combSort";
import { gnomeSortSteps } from "./gnomeSort";

export function getSortingSteps(algorithm: SortingAlgorithm, array: number[]): SortStep[] {
  switch (algorithm) {
    case "bubble":
      return bubbleSortSteps(array);
    case "insertion":
      return insertionSortSteps(array);
    case "merge":
      return mergeSortSteps(array);
    case "quick":
      return quickSortSteps(array);
    case "radix":
      return radixSortSteps(array);
    case "selection":
      return selectionSortSteps(array);
    case "heap":
      return heapSortSteps(array);
    case "shell":
      return shellSortSteps(array);
    case "counting":
      return countingSortSteps(array);
    case "bucket":
      return bucketSortSteps(array);
    case "tim":
      return timSortSteps(array);
    case "cocktail":
      return cocktailShakerSortSteps(array);
    case "comb":
      return combSortSteps(array);
    case "gnome":
      return gnomeSortSteps(array);

    default:
      return [];
  }
}