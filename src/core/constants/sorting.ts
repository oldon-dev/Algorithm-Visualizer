import { AlgorithmOption } from "@/core/types/sorting";

export const DEFAULT_ARRAY_SIZE = 24;
export const MIN_BAR_VALUE = 10;
export const MAX_BAR_VALUE = 280;
export const DEFAULT_SPEED = 120;

export const SPEED_OPTIONS = [
  { label: "Slow", value: 250 },
  { label: "Normal", value: 120 },
  { label: "Fast", value: 45 },
];

export const SORTING_ALGORITHMS: AlgorithmOption[] = [
  {
    value: "bubble",
    label: "Bubble Sort",
    description: "Repeatedly compares adjacent items and swaps them when they are in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    stable: true,
  },
  {
    value: "insertion",
    label: "Insertion Sort",
    description: "Builds the sorted portion one element at a time by inserting each value into its correct position.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    stable: true,
  },
  {
    value: "merge",
    label: "Merge Sort",
    description: "Recursively divides the array and merges sorted halves back together.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    stable: true,
  },
  {
    value: "quick",
    label: "Quick Sort",
    description: "Partitions the array around a pivot and recursively sorts the left and right sides.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    stable: false,
  },
  {
    value: "radix",
    label: "Radix Sort",
    description:
      "A non-comparative sorting algorithm that processes numbers digit by digit using counting sort.",
    timeComplexity: "O(nk)",
    spaceComplexity: "O(n + k)",
    stable: true,
  },
  {
    value: "selection",
    label: "Selection Sort",
    description:
      "A comparison-based sorting algorithm that repeatedly selects the smallest remaining element and places it in its correct position.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    stable: false,
  },
  {
    value: "heap",
    label: "Heap Sort",
    description:
      "A comparison-based sorting algorithm that builds a max heap and repeatedly extracts the largest element.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    stable: false,
  },
  {
    value: "shell",
    label: "Shell Sort",
    description:
      "An optimization of insertion sort that compares elements separated by a gap, gradually reducing the gap until the array is sorted.",
    timeComplexity: "Depends on gap sequence",
    spaceComplexity: "O(1)",
    stable: false,
  },
  {
    value: "counting",
    label: "Counting Sort",
    description:
      "A non-comparison sorting algorithm that counts occurrences of each value and reconstructs the sorted array from those counts.",
    timeComplexity: "O(n + k)",
    spaceComplexity: "O(n + k)",
    stable: true,
  },
  {
    value: "bucket",
    label: "Bucket Sort",
    description:
      "A distribution sorting algorithm that groups elements into buckets, sorts each bucket individually, and combines them into a sorted result.",
    timeComplexity: "Average: O(n + k), Worst: O(n²)",
    spaceComplexity: "O(n + k)",
    stable: true,
  },
  {
    value: "tim",
    label: "TimSort",
    description:
      "A stable hybrid sorting algorithm that combines insertion sort for small runs with merge sort for combining them.",
    timeComplexity: "Best: O(n), Average/Worst: O(n log n)",
    spaceComplexity: "O(n)",
    stable: true,
  },
  {
    value: "cocktail",
    label: "Cocktail Shaker Sort",
    description:
      "A bidirectional variation of bubble sort that traverses the array in both directions, moving large elements right and small elements left.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    stable: true,
  },
  {
    value: "comb",
    label: "Comb Sort",
    description:
      "A variation of bubble sort that starts with a large gap between compared elements and gradually shrinks it.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    stable: false,
  },
  {
    value: "gnome",
    label: "Gnome Sort",
    description:
      "A simple comparison-based sorting algorithm that swaps adjacent out-of-order elements and steps backward when needed.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    stable: true,
  }
];