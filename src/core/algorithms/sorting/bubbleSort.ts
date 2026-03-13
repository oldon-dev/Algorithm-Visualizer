import { SortStep } from "@/core/types/sorting";
import { cloneArray } from "@/core/utils/array";

export function bubbleSortSteps(input: number[]): SortStep[] {
  const array = cloneArray(input);
  const steps: SortStep[] = [
    {
      array: cloneArray(array),
      description: "Starting Bubble Sort.",
      sorted: [],
    },
  ];

  const n = array.length;
  const sortedIndices = new Set<number>();

  for (let i = 0; i < n; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: cloneArray(array),
        comparing: [j, j + 1],
        sorted: Array.from(sortedIndices),
        description: `Comparing ${array[j]} and ${array[j + 1]}.`,
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;

        steps.push({
          array: cloneArray(array),
          swapping: [j, j + 1],
          sorted: Array.from(sortedIndices),
          description: `Swapped ${array[j + 1]} and ${array[j]}.`,
        });
      }
    }

    sortedIndices.add(n - i - 1);

    steps.push({
      array: cloneArray(array),
      sorted: Array.from(sortedIndices),
      description: `Element at position ${n - i} is now in its final place.`,
    });

    if (!swapped) {
      for (let k = 0; k < n - i - 1; k++) {
        sortedIndices.add(k);
      }

      steps.push({
        array: cloneArray(array),
        sorted: Array.from(sortedIndices),
        description: "Array is already sorted. Bubble Sort finished early.",
      });
      return steps;
    }
  }

  return steps;
}