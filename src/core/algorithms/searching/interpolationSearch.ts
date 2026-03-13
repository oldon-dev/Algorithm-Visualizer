import { SearchStep } from "@/core/types/searching";

export function interpolationSearchSteps(
  input: number[],
  target: number
): SearchStep[] {
  const array = [...input];
  const steps: SearchStep[] = [];
  const visited: number[] = [];

  let low = 0;
  let high = array.length - 1;

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
    left: low,
    right: high,
    visited: [],
    description: `Starting Interpolation Search for ${target}`,
  });

  while (
    low <= high &&
    target >= array[low] &&
    target <= array[high]
  ) {
    if (low === high) {
      steps.push({
        array: [...array],
        current: low,
        left: low,
        right: high,
        visited: [...visited],
        description: `Only one element left at index ${low}`,
      });

      if (array[low] === target) {
        steps.push({
          array: [...array],
          current: low,
          found: low,
          left: low,
          right: high,
          visited: [...visited],
          description: `Found ${target} at index ${low}`,
        });
      } else {
        steps.push({
          array: [...array],
          visited: [...visited, low],
          description: `${target} was not found in the array`,
        });
      }

      return steps;
    }

    if (array[high] === array[low]) {
      steps.push({
        array: [...array],
        left: low,
        right: high,
        visited: [...visited],
        description: `All remaining values are the same, checking boundary`,
      });

      if (array[low] === target) {
        steps.push({
          array: [...array],
          current: low,
          found: low,
          left: low,
          right: high,
          visited: [...visited],
          description: `Found ${target} at index ${low}`,
        });
      } else {
        steps.push({
          array: [...array],
          visited: [...visited],
          description: `${target} was not found in the array`,
        });
      }

      return steps;
    }

    const position =
      low +
      Math.floor(
        ((target - array[low]) * (high - low)) /
          (array[high] - array[low])
      );

    steps.push({
      array: [...array],
      current: position,
      mid: position,
      left: low,
      right: high,
      visited: [...visited],
      description: `Estimated target position at index ${position} with value ${array[position]}`,
    });

    if (array[position] === target) {
      steps.push({
        array: [...array],
        current: position,
        found: position,
        mid: position,
        left: low,
        right: high,
        visited: [...visited],
        description: `Found ${target} at index ${position}`,
      });

      return steps;
    }

    visited.push(position);

    if (array[position] < target) {
      steps.push({
        array: [...array],
        left: low,
        right: high,
        mid: position,
        visited: [...visited],
        description: `${array[position]} is less than ${target}, searching right side`,
      });

      low = position + 1;
    } else {
      steps.push({
        array: [...array],
        left: low,
        right: high,
        mid: position,
        visited: [...visited],
        description: `${array[position]} is greater than ${target}, searching left side`,
      });

      high = position - 1;
    }
  }

  steps.push({
    array: [...array],
    visited: [...visited],
    description: `${target} was not found in the array`,
  });

  return steps;
}