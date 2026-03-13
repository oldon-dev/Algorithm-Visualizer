import { SortStep } from "@/core/types/sorting";
import { cloneArray } from "@/core/utils/array";

export function quickSortSteps(input: number[]): SortStep[] {
  const array = cloneArray(input);
  const steps: SortStep[] = [
    {
      array: cloneArray(array),
      description: "Starting Quick Sort.",
      sorted: [],
    },
  ];

  const sortedIndices = new Set<number>();

  function partition(low: number, high: number): number {
    const pivot = array[high];
    let i = low - 1;

    steps.push({
      array: cloneArray(array),
      comparing: [high],
      sorted: Array.from(sortedIndices),
      description: `Choosing ${pivot} as pivot.`,
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: cloneArray(array),
        comparing: [j, high],
        sorted: Array.from(sortedIndices),
        description: `Comparing ${array[j]} with pivot ${pivot}.`,
      });

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];

        steps.push({
          array: cloneArray(array),
          swapping: [i, j],
          sorted: Array.from(sortedIndices),
          description: `Swapped ${array[i]} into the left partition.`,
        });
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    steps.push({
      array: cloneArray(array),
      swapping: [i + 1, high],
      sorted: Array.from(sortedIndices),
      description: `Placed pivot ${pivot} in its correct position.`,
    });

    sortedIndices.add(i + 1);

    steps.push({
      array: cloneArray(array),
      sorted: Array.from(sortedIndices),
      description: `Pivot ${pivot} is now fixed.`,
    });

    return i + 1;
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    } else if (low === high) {
      sortedIndices.add(low);

      steps.push({
        array: cloneArray(array),
        sorted: Array.from(sortedIndices),
        description: `Element ${array[low]} is in its final position.`,
      });
    }
  }

  quickSort(0, array.length - 1);

  steps.push({
    array: cloneArray(array),
    sorted: Array.from({ length: array.length }, (_, idx) => idx),
    description: "Quick Sort completed.",
  });

  return steps;
}