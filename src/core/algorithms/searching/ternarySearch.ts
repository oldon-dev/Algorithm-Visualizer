import { SearchStep } from "@/core/types/searching";

export function ternarySearchSteps(input: number[], target: number): SearchStep[] {
  const array = [...input];
  const steps: SearchStep[] = [];
  const visited: number[] = [];

  let left = 0;
  let right = array.length - 1;

  if (array.length === 0) {
    return [
      {
        array: [],
        description: "Array is empty",
      },
    ];
  }

  steps.push({
    array: [...array],
    left,
    right,
    visited: [],
    description: `Starting Ternary Search for ${target}`,
  });

  while (left <= right) {
    const third = Math.floor((right - left) / 3);
    const mid1 = left + third;
    const mid2 = right - third;

    steps.push({
      array: [...array],
      left,
      right,
      mid: mid1,
      current: mid1,
      visited: [...visited],
      description: `Checking first midpoint at index ${mid1} with value ${array[mid1]}`,
    });

    if (array[mid1] === target) {
      steps.push({
        array: [...array],
        left,
        right,
        mid: mid1,
        current: mid1,
        found: mid1,
        visited: [...visited],
        description: `Found ${target} at index ${mid1}`,
      });

      return steps;
    }

    visited.push(mid1);

    steps.push({
      array: [...array],
      left,
      right,
      mid: mid2,
      current: mid2,
      visited: [...visited],
      description: `Checking second midpoint at index ${mid2} with value ${array[mid2]}`,
    });

    if (array[mid2] === target) {
      steps.push({
        array: [...array],
        left,
        right,
        mid: mid2,
        current: mid2,
        found: mid2,
        visited: [...visited],
        description: `Found ${target} at index ${mid2}`,
      });

      return steps;
    }

    visited.push(mid2);

    if (target < array[mid1]) {
      steps.push({
        array: [...array],
        left,
        right,
        visited: [...visited],
        description: `${target} is less than ${array[mid1]}, searching left third`,
      });

      right = mid1 - 1;
    } else if (target > array[mid2]) {
      steps.push({
        array: [...array],
        left,
        right,
        visited: [...visited],
        description: `${target} is greater than ${array[mid2]}, searching right third`,
      });

      left = mid2 + 1;
    } else {
      steps.push({
        array: [...array],
        left,
        right,
        visited: [...visited],
        description: `${target} lies between ${array[mid1]} and ${array[mid2]}, searching middle third`,
      });

      left = mid1 + 1;
      right = mid2 - 1;
    }
  }

  steps.push({
    array: [...array],
    visited: [...visited],
    description: `${target} was not found in the array`,
  });

  return steps;
}