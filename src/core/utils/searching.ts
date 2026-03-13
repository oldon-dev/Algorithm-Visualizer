import {
  DEFAULT_SEARCHING_ARRAY_SIZE,
  SEARCHING_ALGORITHMS,
} from "@/core/constants/searching";
import { SearchingAlgorithm } from "@/core/types/searching";

export function generateSearchingArray(
  size: number = DEFAULT_SEARCHING_ARRAY_SIZE
): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 320) + 20);
}

export function sortSearchingArray(array: number[]): number[] {
  return [...array].sort((a, b) => a - b);
}

export function getSearchingAlgorithmMeta(algorithm: SearchingAlgorithm) {
  const meta = SEARCHING_ALGORITHMS.find((item) => item.value === algorithm);

  if (!meta) {
    throw new Error(`Searching metadata not found for algorithm: ${algorithm}`);
  }

  return meta;
}

export function getRandomTargetFromArray(array: number[]): number {
  if (array.length === 0) {
    return 0;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function algorithmRequiresSortedArray(algorithm: SearchingAlgorithm) {
  return (
    algorithm === "binary" ||
    algorithm === "jump" ||
    algorithm === "interpolation" ||
    algorithm === "exponential" ||
    algorithm === "ternary"
  );
}

export function getInitialSearchingState(
  algorithm: SearchingAlgorithm,
  size: number = DEFAULT_SEARCHING_ARRAY_SIZE
) {
  const baseArray = generateSearchingArray(size);
  const array = algorithmRequiresSortedArray(algorithm)
    ? sortSearchingArray(baseArray)
    : [...baseArray];
  const target = getRandomTargetFromArray(array);

  return {
    array,
    target,
  };
}