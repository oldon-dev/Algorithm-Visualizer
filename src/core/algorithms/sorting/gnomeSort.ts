import { SortStep } from "@/core/types/sorting";

export function gnomeSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;

  const pushStep = (
    description: string,
    comparing: number[] = [],
    swapping: number[] = [],
    sorted: number[] = []
  ) => {
    steps.push({
      array: [...arr],
      comparing: comparing.length ? comparing : undefined,
      swapping: swapping.length ? swapping : undefined,
      sorted: sorted.length ? sorted : undefined,
      description,
    });
  };

  if (n === 0) {
    return [
      {
        array: [],
        description: "Array is empty",
      },
    ];
  }

  let index = 0;

  pushStep("Starting Gnome Sort");

  while (index < n) {
    if (index === 0) {
      pushStep(`At index 0, moving forward`);
      index++;
      continue;
    }

    pushStep(
      `Comparing ${arr[index - 1]} and ${arr[index]}`,
      [index - 1, index]
    );

    if (arr[index] >= arr[index - 1]) {
      pushStep(
        `${arr[index]} is in correct order with ${arr[index - 1]}, moving forward`,
        [index - 1, index]
      );
      index++;
    } else {
      const left = arr[index - 1];
      const right = arr[index];

      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];

      pushStep(
        `Swapping ${left} with ${right}`,
        [],
        [index - 1, index]
      );

      index--;
    }
  }

  pushStep(
    "Array fully sorted using Gnome Sort",
    [],
    [],
    arr.map((_, index) => index)
  );

  return steps;
}