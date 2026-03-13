import { SortStep } from "@/core/types/sorting";

export function countingSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];

  if (arr.length === 0) {
    return [
      {
        array: [],
        description: "Array is empty",
      },
    ];
  }

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;

  const count = new Array(range).fill(0);
  const output = new Array(arr.length).fill(0);

  steps.push({
    array: [...arr],
    description: `Starting Counting Sort with value range from ${min} to ${max}`,
  });

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;

    steps.push({
      array: [...arr],
      comparing: [i],
      description: `Counting occurrence of value ${arr[i]}`,
    });
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  steps.push({
    array: [...arr],
    description: "Computed cumulative counts",
  });

  for (let i = arr.length - 1; i >= 0; i--) {
    const value = arr[i];
    const position = count[value - min] - 1;

    output[position] = value;
    count[value - min]--;

    steps.push({
      array: [...arr],
      comparing: [i],
      description: `Placing value ${value} into output position ${position}`,
    });
  }

  for (let i = 0; i < output.length; i++) {
    arr[i] = output[i];

    steps.push({
      array: [...arr],
      swapping: [i],
      description: `Writing ${arr[i]} back to the original array at index ${i}`,
    });
  }

  steps.push({
    array: [...arr],
    sorted: arr.map((_, index) => index),
    description: "Array fully sorted using Counting Sort",
  });

  return steps;
}