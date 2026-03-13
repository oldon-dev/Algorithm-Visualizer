import { SortStep } from "@/core/types/sorting";

const RUN = 32;

export function timSortSteps(input: number[]): SortStep[] {
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

  const insertionSort = (left: number, right: number) => {
    for (let i = left + 1; i <= right; i++) {
      const temp = arr[i];
      let j = i - 1;

      pushStep(
        `Insertion sorting run: considering ${temp} at index ${i}`,
        [i]
      );

      while (j >= left) {
        pushStep(
          `Comparing ${arr[j]} and ${temp} inside run`,
          [j, j + 1]
        );

        if (arr[j] > temp) {
          arr[j + 1] = arr[j];

          pushStep(
            `Shifting ${arr[j]} from index ${j} to index ${j + 1}`,
            [],
            [j, j + 1]
          );

          j--;
        } else {
          break;
        }
      }

      arr[j + 1] = temp;

      pushStep(
        `Placing ${temp} at index ${j + 1}`,
        [],
        [j + 1]
      );
    }
  };

  const merge = (left: number, mid: number, right: number) => {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    pushStep(
      `Merging runs from ${left} to ${mid} and ${mid + 1} to ${right}`
    );

    while (i < leftPart.length && j < rightPart.length) {
      const leftIndex = left + i;
      const rightIndex = mid + 1 + j;

      pushStep(
        `Comparing ${leftPart[i]} and ${rightPart[j]} while merging`,
        [leftIndex, rightIndex]
      );

      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];

        pushStep(
          `Writing ${leftPart[i]} to index ${k}`,
          [],
          [k]
        );

        i++;
      } else {
        arr[k] = rightPart[j];

        pushStep(
          `Writing ${rightPart[j]} to index ${k}`,
          [],
          [k]
        );

        j++;
      }

      k++;
    }

    while (i < leftPart.length) {
      arr[k] = leftPart[i];

      pushStep(
        `Copying remaining left value ${leftPart[i]} to index ${k}`,
        [],
        [k]
      );

      i++;
      k++;
    }

    while (j < rightPart.length) {
      arr[k] = rightPart[j];

      pushStep(
        `Copying remaining right value ${rightPart[j]} to index ${k}`,
        [],
        [k]
      );

      j++;
      k++;
    }
  };

  pushStep("Starting TimSort");

  for (let start = 0; start < n; start += RUN) {
    const end = Math.min(start + RUN - 1, n - 1);

    pushStep(`Sorting run from index ${start} to ${end}`);
    insertionSort(start, end);
  }

  for (let size = RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        merge(left, mid, right);
      }
    }
  }

  pushStep(
    "Array fully sorted using TimSort",
    [],
    [],
    arr.map((_, index) => index)
  );

  return steps;
}