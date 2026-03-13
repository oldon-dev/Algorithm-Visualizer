import { SearchStep } from "@/core/types/searching";

export function jumpSearchSteps(input: number[], target: number): SearchStep[] {
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

  const stepSize = Math.floor(Math.sqrt(n));
  let prev = 0;
  let current = stepSize;

  steps.push({
    array: [...array],
    left: 0,
    right: Math.min(stepSize - 1, n - 1),
    visited: [],
    description: `Starting Jump Search for ${target} with jump size ${stepSize}`,
  });

  while (prev < n && array[Math.min(current, n) - 1] < target) {
    const blockEnd = Math.min(current, n) - 1;

    steps.push({
      array: [...array],
      current: blockEnd,
      left: prev,
      right: blockEnd,
      visited: [...visited],
      description: `Checking block ending at index ${blockEnd} with value ${array[blockEnd]}`,
    });

    visited.push(blockEnd);

    prev = current;
    current += stepSize;

    if (prev >= n) {
      steps.push({
        array: [...array],
        visited: [...visited],
        description: `${target} was not found in the array`,
      });

      return steps;
    }

    steps.push({
      array: [...array],
      left: prev,
      right: Math.min(current - 1, n - 1),
      visited: [...visited],
      description: `Target is larger, jumping to the next block`,
    });
  }

  const searchEnd = Math.min(current, n);

  steps.push({
    array: [...array],
    left: prev,
    right: searchEnd - 1,
    visited: [...visited],
    description: `Target may be in block from index ${prev} to ${searchEnd - 1}, starting linear scan`,
  });

  for (let index = prev; index < searchEnd; index++) {
    steps.push({
      array: [...array],
      current: index,
      left: prev,
      right: searchEnd - 1,
      visited: [...visited],
      description: `Checking index ${index} with value ${array[index]}`,
    });

    if (array[index] === target) {
      steps.push({
        array: [...array],
        current: index,
        found: index,
        left: prev,
        right: searchEnd - 1,
        visited: [...visited],
        description: `Found ${target} at index ${index}`,
      });

      return steps;
    }

    visited.push(index);

    if (array[index] > target) {
      steps.push({
        array: [...array],
        visited: [...visited],
        left: prev,
        right: searchEnd - 1,
        description: `${array[index]} is greater than ${target}, stopping scan`,
      });

      return [
        ...steps,
        {
          array: [...array],
          visited: [...visited],
          description: `${target} was not found in the array`,
        },
      ];
    }
  }

  steps.push({
    array: [...array],
    visited: [...visited],
    description: `${target} was not found in the array`,
  });

  return steps;
}