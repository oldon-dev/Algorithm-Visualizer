"use client";

import { useEffect } from "react";
import { SortingBars } from "./SortingBars";
import { SortingControls } from "./SortingControls";
import { SortingInfo } from "./SortingInfo";
import { useSortingVisualizer } from "@/hooks/useSortingVisualizer";
import { SortingAlgorithm } from "@/core/types/sorting";
import { getAlgorithmMeta } from "@/core/utils/sorting";
import { SORTING_COLORS } from "@/core/constants/colors";


type Props = {
  algorithm: SortingAlgorithm;
};

export function SortingVisualizer({ algorithm }: Props) {
  const meta = getAlgorithmMeta(algorithm);

  const {
    arraySize,
    setArraySize,
    speed,
    setSpeed,
    currentStep,
    currentStepIndex,
    totalSteps,
    isPlaying,
    generateNewArray,
    start,
    pause,
    resume,
    reset,
  } = useSortingVisualizer(algorithm);

  useEffect(() => {
    generateNewArray(arraySize);
  }, [arraySize, generateNewArray]);

  return (
    <section className="flex flex-col gap-6">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
          Sorting Algorithms
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {meta.label}
        </h1>
      </div>

      <SortingControls
        arraySize={arraySize}
        onArraySizeChange={setArraySize}
        speed={speed}
        onSpeedChange={setSpeed}
        isPlaying={isPlaying}
        hasSteps={totalSteps > 0}
        onGenerate={() => generateNewArray(arraySize)}
        onStart={start}
        onPause={pause}
        onResume={resume}
        onReset={reset}
      />

      <SortingBars
        values={currentStep.array}
        comparing={currentStep.comparing}
        swapping={currentStep.swapping}
        sorted={currentStep.sorted}
      />

      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${SORTING_COLORS.default.legend}`} />
          Default
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${SORTING_COLORS.comparing.legend}`} />
          Comparing
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${SORTING_COLORS.changing.legend}`} />
          Changing
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${SORTING_COLORS.sorted.legend }`} />
          Sorted
        </div>
      </div>

      <SortingInfo
        algorithm={algorithm}
        description={currentStep.description}
        step={currentStepIndex}
        totalSteps={totalSteps}
      />
    </section>
  );
}