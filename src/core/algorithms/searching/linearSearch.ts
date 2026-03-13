import { SearchStep } from "@/core/types/searching";

export function linearSearchSteps(input: number[], target: number): SearchStep[] {
  const array = [...input];
  const steps: SearchStep[] = [];
  const visited: number[] = [];

  steps.push({
    array: [...array],
    visited: [],
    description: `Starting Linear Search for ${target}`,
  });

  for (let index = 0; index < array.length; index++) {
    steps.push({
      array: [...array],
      current: index,
      visited: [...visited],
      description: `Checking index ${index} with value ${array[index]}`,
    });

    if (array[index] === target) {
      steps.push({
        array: [...array],
        current: index,
        found: index,
        visited: [...visited],
        description: `Found ${target} at index ${index}`,
      });

      return steps;
    }

    visited.push(index);

    steps.push({
      array: [...array],
      visited: [...visited],
      description: `${target} is not at index ${index}`,
    });
  }

  steps.push({
    array: [...array],
    visited: [...visited],
    description: `${target} was not found in the array`,
  });

  return steps;
}