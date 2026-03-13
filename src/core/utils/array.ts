import { DEFAULT_ARRAY_SIZE, MAX_BAR_VALUE, MIN_BAR_VALUE } from "@/core/constants/sorting";

export function generateRandomArray(size = DEFAULT_ARRAY_SIZE): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (MAX_BAR_VALUE - MIN_BAR_VALUE + 1)) + MIN_BAR_VALUE
  );
}

export function cloneArray(array: number[]): number[] {
  return [...array];
}