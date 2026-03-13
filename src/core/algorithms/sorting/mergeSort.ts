import { SortStep } from "@/core/types/sorting";
import { cloneArray } from "@/core/utils/array";

export function mergeSortSteps(input: number[]): SortStep[] {
  const array = cloneArray(input);
  const steps: SortStep[] = [
    {
      array: cloneArray(array),
      description: "Starting Merge Sort.",
      sorted: [],
    },
  ];

  function merge(start: number, mid: number, end: number) {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);

    let i = 0;
    let j = 0;
    let k = start;

    steps.push({
      array: cloneArray(array),
      comparing: [start, end],
      description: `Merging subarrays from index ${start} to ${mid} and ${mid + 1} to ${end}.`,
      sorted: [],
    });

    while (i < left.length && j < right.length) {
      steps.push({
        array: cloneArray(array),
        comparing: [k],
        description: `Comparing ${left[i]} and ${right[j]}.`,
        sorted: [],
      });

      if (left[i] <= right[j]) {
        array[k] = left[i];
        i++;
      } else {
        array[k] = right[j];
        j++;
      }

      steps.push({
        array: cloneArray(array),
        swapping: [k],
        description: `Placed ${array[k]} into position ${k}.`,
        sorted: [],
      });

      k++;
    }

    while (i < left.length) {
      array[k] = left[i];
      steps.push({
        array: cloneArray(array),
        swapping: [k],
        description: `Copying remaining left value ${left[i]} into position ${k}.`,
        sorted: [],
      });
      i++;
      k++;
    }

    while (j < right.length) {
      array[k] = right[j];
      steps.push({
        array: cloneArray(array),
        swapping: [k],
        description: `Copying remaining right value ${right[j]} into position ${k}.`,
        sorted: [],
      });
      j++;
      k++;
    }

    const sortedRange = Array.from({ length: end - start + 1 }, (_, idx) => start + idx);

    steps.push({
      array: cloneArray(array),
      sorted: sortedRange,
      description: `Merged range ${start} to ${end}.`,
    });
  }

  function sort(start: number, end: number) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    sort(start, mid);
    sort(mid + 1, end);
    merge(start, mid, end);
  }

  sort(0, array.length - 1);

  steps.push({
    array: cloneArray(array),
    sorted: Array.from({ length: array.length }, (_, idx) => idx),
    description: "Merge Sort completed.",
  });

  return steps;
}