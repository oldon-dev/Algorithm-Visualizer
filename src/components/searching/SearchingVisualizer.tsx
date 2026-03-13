"use client";

import { useEffect } from "react";
import { SEARCHING_COLORS } from "@/core/constants/colors";
import { SearchingAlgorithm } from "@/core/types/searching";
import { getSearchingAlgorithmMeta } from "@/core/utils/searching";
import { useSearchingVisualizer } from "@/hooks/useSearchingVisualizer";
import { SearchingBars } from "./SearchingBars";
import { SearchingControls } from "./SearchingControls";
import { SearchingInfo } from "./SearchingInfo";

type Props = {
  algorithm: SearchingAlgorithm;
};

export function SearchingVisualizer({ algorithm }: Props) {
  const meta = getSearchingAlgorithmMeta(algorithm);

  const {
    arraySize,
    setArraySize,
    speed,
    setSpeed,
    target,
    setTarget,
    currentStep,
    currentStepIndex,
    totalSteps,
    isPlaying,
    generateNewArray,
    start,
    pause,
    resume,
    reset,
  } = useSearchingVisualizer(algorithm);
  
  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  return (
    <section className="flex flex-col gap-6">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
          Searching Algorithms
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {meta.label}
        </h1>
      </div>

      <SearchingControls
        arraySize={arraySize}
        onArraySizeChange={setArraySize}
        target={target}
        onTargetChange={setTarget}
        speed={speed}
        onSpeedChange={setSpeed}
        isPlaying={isPlaying}
        hasSteps={totalSteps > 0}
        onGenerate={generateNewArray}
        onStart={start}
        onPause={pause}
        onResume={resume}
        onReset={reset}
      />

      <SearchingBars
        values={currentStep.array}
        current={currentStep.current}
        found={currentStep.found}
        visited={currentStep.visited}
        left={currentStep.left}
        right={currentStep.right}
        mid={currentStep.mid}
      />

      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${SEARCHING_COLORS.default.legend}`} />
          Default
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${SEARCHING_COLORS.visited.legend}`} />
          Visited
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${SEARCHING_COLORS.current.legend}`} />
          Current
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${SEARCHING_COLORS.boundary.legend}`} />
          Boundary
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${SEARCHING_COLORS.found.legend}`} />
          Found
        </div>
      </div>

      <SearchingInfo
        algorithm={algorithm}
        description={currentStep.description}
        step={currentStepIndex}
        totalSteps={totalSteps}
      />
    </section>
  );
}