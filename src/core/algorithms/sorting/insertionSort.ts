import { SortStep } from "@/core/types/sorting";
import { cloneArray } from "@/core/utils/array";

export function insertionSortSteps(input: number[]): SortStep[] {
  const array = cloneArray(input);
  const steps: SortStep[] = [
    {
      array: cloneArray(array),
      description: "Starting Insertion Sort.",
      sorted: [0],
    },
  ];

  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    steps.push({
      array: cloneArray(array),
      comparing: [i],
      sorted: Array.from({ length: i }, (_, idx) => idx),
      description: `Selecting ${key} to insert into the sorted portion.`,
    });

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: cloneArray(array),
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        description: `Comparing ${array[j]} with ${key}.`,
      });

      array[j + 1] = array[j];

      steps.push({
        array: cloneArray(array),
        swapping: [j, j + 1],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        description: `Shifting ${array[j]} to the right.`,
      });

      j--;
    }

    array[j + 1] = key;

    steps.push({
      array: cloneArray(array),
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      description: `${key} inserted into its correct position.`,
    });
  }

  return steps;
}