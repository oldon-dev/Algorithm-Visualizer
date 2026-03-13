import { SortStep } from "@/core/types/sorting";

export function bucketSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;

  if (n === 0) {
    return [
      {
        array: [],
        description: "Array is empty",
      },
    ];
  }

  const min = Math.min(...arr);
  const max = Math.max(...arr);

  if (min === max) {
    return [
      {
        array: [...arr],
        sorted: arr.map((_, index) => index),
        description: "All elements are equal, array is already sorted",
      },
    ];
  }

  const bucketCount = n;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  steps.push({
    array: [...arr],
    description: `Starting Bucket Sort with ${bucketCount} buckets`,
  });

  const getBucketIndex = (value: number) => {
    return Math.min(
      bucketCount - 1,
      Math.floor(((value - min) / (max - min)) * bucketCount)
    );
  };

  for (let i = 0; i < n; i++) {
    const value = arr[i];
    const bucketIndex = getBucketIndex(value);

    steps.push({
      array: [...arr],
      comparing: [i],
      description: `Placing value ${value} into bucket ${bucketIndex}`,
    });

    buckets[bucketIndex].push(value);
  }

  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].length > 1) {
      buckets[i].sort((a, b) => a - b);
    }
  }

  steps.push({
    array: [...arr],
    description: "Buckets sorted individually",
  });

  let writeIndex = 0;

  for (let bucketIndex = 0; bucketIndex < bucketCount; bucketIndex++) {
    for (const value of buckets[bucketIndex]) {
      arr[writeIndex] = value;

      steps.push({
        array: [...arr],
        swapping: [writeIndex],
        description: `Writing ${value} from bucket ${bucketIndex} to index ${writeIndex}`,
      });

      writeIndex++;
    }
  }

  steps.push({
    array: [...arr],
    sorted: arr.map((_, index) => index),
    description: "Array fully sorted using Bucket Sort",
  });

  return steps;
}