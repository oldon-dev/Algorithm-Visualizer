import { SearchStep } from "@/core/types/searching";

export function binarySearchSteps(input: number[], target: number): SearchStep[] {
  const array = [...input];
  const steps: SearchStep[] = [];
  const visited: number[] = [];

  let left = 0;
  let right = array.length - 1;

  steps.push({
    array: [...array],
    left,
    right,
    visited: [],
    description: `Starting Binary Search for ${target}`,
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...array],
      left,
      right,
      mid,
      current: mid,
      visited: [...visited],
      description: `Checking middle index ${mid} with value ${array[mid]}`,
    });

    if (array[mid] === target) {
      steps.push({
        array: [...array],
        left,
        right,
        mid,
        current: mid,
        found: mid,
        visited: [...visited],
        description: `Found ${target} at index ${mid}`,
      });

      return steps;
    }

    visited.push(mid);

    if (array[mid] < target) {
      steps.push({
        array: [...array],
        left,
        right,
        mid,
        visited: [...visited],
        description: `${array[mid]} is less than ${target}, searching right half`,
      });

      left = mid + 1;
    } else {
      steps.push({
        array: [...array],
        left,
        right,
        mid,
        visited: [...visited],
        description: `${array[mid]} is greater than ${target}, searching left half`,
      });

      right = mid - 1;
    }
  }

  steps.push({
    array: [...array],
    visited: [...visited],
    description: `${target} was not found in the array`,
  });

  return steps;
}