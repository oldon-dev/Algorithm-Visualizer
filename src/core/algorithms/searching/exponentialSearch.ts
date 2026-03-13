import { SearchStep } from "@/core/types/searching";

export function exponentialSearchSteps(
  input: number[],
  target: number
): SearchStep[] {
  const array = [...input];
  const steps: SearchStep[] = [];
  const visited: number[] = [];
  const n = array.length;

  if (n === 0) {
    return [
      {
        array: [],
        description: "Array is empty",
      },
    ];
  }

  steps.push({
    array: [...array],
    left: 0,
    right: n - 1,
    visited: [],
    description: `Starting Exponential Search for ${target}`,
  });

  steps.push({
    array: [...array],
    current: 0,
    visited: [],
    description: `Checking index 0 with value ${array[0]}`,
  });

  if (array[0] === target) {
    steps.push({
      array: [...array],
      current: 0,
      found: 0,
      visited: [],
      description: `Found ${target} at index 0`,
    });

    return steps;
  }

  visited.push(0);

  let bound = 1;

  while (bound < n && array[bound] < target) {
    steps.push({
      array: [...array],
      current: bound,
      left: Math.floor(bound / 2),
      right: Math.min(bound, n - 1),
      visited: [...visited],
      description: `Checking exponential bound at index ${bound} with value ${array[bound]}`,
    });

    visited.push(bound);
    bound *= 2;
  }

  let left = Math.floor(bound / 2);
  let right = Math.min(bound, n - 1);

  steps.push({
    array: [...array],
    left,
    right,
    visited: [...visited],
    description: `Target range identified from index ${left} to ${right}, starting binary search`,
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