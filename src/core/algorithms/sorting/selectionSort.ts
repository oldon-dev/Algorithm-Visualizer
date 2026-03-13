import { SortStep } from "@/core/types/sorting";

export function selectionSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    steps.push({
      array: [...arr],
      comparing: [i],
      description: `Starting search for the minimum element from index ${i}`,
    });

    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIndex, j],
        description: `Comparing current minimum ${arr[minIndex]} with ${arr[j]}`,
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;

        steps.push({
          array: [...arr],
          comparing: [i, minIndex],
          description: `New minimum found: ${arr[minIndex]} at index ${minIndex}`,
        });
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      steps.push({
        array: [...arr],
        swapping: [i, minIndex],
        description: `Swapping ${arr[minIndex]} with ${arr[i]}`,
      });
    }

    steps.push({
      array: [...arr],
      sorted: Array.from({ length: i + 1 }, (_, index) => index),
      description: `Element at index ${i} is now in its final sorted position`,
    });
  }

  steps.push({
    array: [...arr],
    sorted: arr.map((_, index) => index),
    description: "Array fully sorted using Selection Sort",
  });

  return steps;
}