import { SortStep } from "@/core/types/sorting";

export function shellSortSteps(input: number[]): SortStep[] {
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

  pushStep("Starting Shell Sort");

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    pushStep(`Starting pass with gap ${gap}`);

    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      pushStep(
        `Considering value ${temp} at index ${i} with gap ${gap}`,
        [i]
      );

      while (j >= gap) {
        pushStep(
          `Comparing ${arr[j - gap]} and ${temp} with gap ${gap}`,
          [j - gap, j]
        );

        if (arr[j - gap] > temp) {
          arr[j] = arr[j - gap];

          pushStep(
            `Shifting ${arr[j - gap]} from index ${j - gap} to index ${j}`,
            [],
            [j - gap, j]
          );

          j -= gap;
        } else {
          break;
        }
      }

      arr[j] = temp;

      pushStep(
        `Placing ${temp} at index ${j}`,
        [],
        [j]
      );
    }
  }

  pushStep(
    "Array fully sorted using Shell Sort",
    [],
    [],
    arr.map((_, index) => index)
  );

  return steps;
}