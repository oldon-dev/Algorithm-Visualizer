import { SearchingAlgorithmMeta } from "@/core/types/searching";


export const DEFAULT_SEARCHING_ARRAY_SIZE = 24;
export const MIN_SEARCHING_ARRAY_SIZE = 8;
export const MAX_SEARCHING_ARRAY_SIZE = 60;
export const SEARCHING_ARRAY_SIZE_STEP = 1;

export const DEFAULT_SEARCHING_SPEED = 120;
export const MIN_SEARCHING_SPEED = 20;
export const MAX_SEARCHING_SPEED = 260;
export const SEARCHING_SPEED_STEP = 10;

export const SEARCHING_ALGORITHMS: SearchingAlgorithmMeta[] = [
  {
    value: "linear",
    label: "Linear Search",
    description:
      "A simple search algorithm that checks each element one by one until the target is found or the array ends.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    requiresSortedArray: false,
  },
  {
    value: "binary",
    label: "Binary Search",
    description:
      "A divide-and-conquer search algorithm that repeatedly inspects the middle element of a sorted array and halves the search space.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    requiresSortedArray: true,
  },
  {
    value: "jump",
    label: "Jump Search",
    description:
      "A search algorithm for sorted arrays that jumps ahead by fixed steps and then performs a linear scan within the identified block.",
    timeComplexity: "O(√n)",
    spaceComplexity: "O(1)",
    requiresSortedArray: true,
  },
  {
    value: "interpolation",
    label: "Interpolation Search",
    description:
      "A search algorithm for sorted arrays that estimates the likely position of the target based on its value.",
    timeComplexity: "Average: O(log log n), Worst: O(n)",
    spaceComplexity: "O(1)",
    requiresSortedArray: true,
  },
  {
    value: "exponential",
    label: "Exponential Search",
    description:
      "A search algorithm for sorted arrays that quickly finds a range by doubling the index, then performs binary search inside that range.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    requiresSortedArray: true,
  },
  {
    value: "ternary",
    label: "Ternary Search",
    description:
      "A search algorithm for sorted arrays that splits the current range into three parts and narrows the search based on two midpoints.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    requiresSortedArray: true,
  },
];