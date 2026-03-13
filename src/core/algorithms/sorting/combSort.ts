import { SortStep } from "@/core/types/sorting";

const SHRINK_FACTOR = 1.3;

export function combSortSteps(input: number[]): SortStep[] {
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

  let gap = n;
  let swapped = true;

  pushStep("Starting Comb Sort");

  while (gap > 1 || swapped) {
    gap = Math.max(1, Math.floor(gap / SHRINK_FACTOR));
    swapped = false;

    pushStep(`Starting pass with gap ${gap}`);

    for (let i = 0; i + gap < n; i++) {
      const j = i + gap;

      pushStep(
        `Comparing ${arr[i]} and ${arr[j]} with gap ${gap}`,
        [i, j]
      );

      if (arr[i] > arr[j]) {
        const left = arr[i];
        const right = arr[j];

        [arr[i], arr[j]] = [arr[j], arr[i]];
        swapped = true;

        pushStep(
          `Swapping ${left} with ${right}`,
          [],
          [i, j]
        );
      }
    }
  }

  pushStep(
    "Array fully sorted using Comb Sort",
    [],
    [],
    arr.map((_, index) => index)
  );

  return steps;
}