import { SortStep } from "@/core/types/sorting";

export function heapSortSteps(input: number[]): SortStep[] {
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

  const heapify = (heapSize: number, rootIndex: number, sortedIndices: number[] = []) => {
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    if (left < heapSize) {
      pushStep(
        `Comparing parent ${arr[largest]} with left child ${arr[left]}`,
        [largest, left],
        [],
        sortedIndices
      );

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < heapSize) {
      pushStep(
        `Comparing current largest ${arr[largest]} with right child ${arr[right]}`,
        [largest, right],
        [],
        sortedIndices
      );

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== rootIndex) {
      const rootValue = arr[rootIndex];
      const largestValue = arr[largest];

      [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];

      pushStep(
        `Swapping ${rootValue} with ${largestValue} to maintain max heap`,
        [],
        [rootIndex, largest],
        sortedIndices
      );

      heapify(heapSize, largest, sortedIndices);
    }
  };

  pushStep("Starting Heap Sort");

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    pushStep(`Heapifying subtree rooted at index ${i}`);
    heapify(n, i);
  }

  pushStep("Max heap built successfully");

  const sortedIndices: number[] = [];

  for (let end = n - 1; end > 0; end--) {
    const rootValue = arr[0];
    const endValue = arr[end];

    [arr[0], arr[end]] = [arr[end], arr[0]];

    sortedIndices.unshift(end);

    pushStep(
      `Moving largest element ${rootValue} to sorted position by swapping with ${endValue}`,
      [],
      [0, end],
      sortedIndices
    );

    heapify(end, 0, sortedIndices);
  }

  if (n > 0) {
    sortedIndices.unshift(0);
  }

  pushStep(
    "Array fully sorted using Heap Sort",
    [],
    [],
    arr.map((_, index) => index)
  );

  return steps;
}