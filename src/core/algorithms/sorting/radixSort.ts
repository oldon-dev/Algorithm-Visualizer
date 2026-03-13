import { SortStep } from "@/core/types/sorting";

export function radixSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];

  const max = Math.max(...arr);

  const getDigit = (num: number, exp: number) => Math.floor(num / exp) % 10;

  const countingSortByDigit = (exp: number) => {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], exp);
      count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = getDigit(arr[i], exp);
      const position = count[digit] - 1;

      output[position] = arr[i];
      count[digit]--;
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];

      steps.push({
        array: [...arr],
        swapping: [i],
        description: `Placing ${arr[i]} based on digit position ${exp}`,
      });
    }
  };

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(exp);
  }

  steps.push({
    array: [...arr],
    sorted: arr.map((_, i) => i),
    description: "Array fully sorted using Radix Sort",
  });

  return steps;
}