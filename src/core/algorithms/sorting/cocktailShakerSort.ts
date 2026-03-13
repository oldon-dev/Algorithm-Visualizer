import { SortStep } from "@/core/types/sorting";

export function cocktailShakerSortSteps(input: number[]): SortStep[] {
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

  let start = 0;
  let end = n - 1;
  let swapped = true;

  pushStep("Starting Cocktail Shaker Sort");

  while (swapped) {
    swapped = false;

    pushStep(
      `Forward pass from index ${start} to ${end}`,
      [],
      [],
      Array.from({ length: start }, (_, i) => i).concat(
        Array.from({ length: n - 1 - end }, (_, i) => end + 1 + i)
      )
    );

    for (let i = start; i < end; i++) {
      pushStep(
        `Comparing ${arr[i]} and ${arr[i + 1]}`,
        [i, i + 1],
        [],
        Array.from({ length: start }, (_, j) => j).concat(
          Array.from({ length: n - 1 - end }, (_, j) => end + 1 + j)
        )
      );

      if (arr[i] > arr[i + 1]) {
        const left = arr[i];
        const right = arr[i + 1];

        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

        swapped = true;

        pushStep(
          `Swapping ${left} with ${right}`,
          [],
          [i, i + 1],
          Array.from({ length: start }, (_, j) => j).concat(
            Array.from({ length: n - 1 - end }, (_, j) => end + 1 + j)
          )
        );
      }
    }

    const rightSorted = end;
    end--;

    if (!swapped) {
      break;
    }

    swapped = false;

    pushStep(
      `Backward pass from index ${end} to ${start}`,
      [],
      [],
      Array.from({ length: start }, (_, i) => i).concat([rightSorted]).concat(
        Array.from({ length: n - 1 - rightSorted }, (_, i) => rightSorted + 1 + i)
      )
    );

    for (let i = end; i > start; i--) {
      pushStep(
        `Comparing ${arr[i - 1]} and ${arr[i]}`,
        [i - 1, i],
        [],
        Array.from({ length: start }, (_, j) => j).concat(
          Array.from({ length: n - 1 - rightSorted }, (_, j) => rightSorted + 1 + j)
        )
      );

      if (arr[i - 1] > arr[i]) {
        const left = arr[i - 1];
        const right = arr[i];

        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];

        swapped = true;

        pushStep(
          `Swapping ${left} with ${right}`,
          [],
          [i - 1, i],
          Array.from({ length: start }, (_, j) => j).concat(
            Array.from({ length: n - 1 - rightSorted }, (_, j) => rightSorted + 1 + j)
          )
        );
      }
    }

    start++;
  }

  pushStep(
    "Array fully sorted using Cocktail Shaker Sort",
    [],
    [],
    arr.map((_, index) => index)
  );

  return steps;
}