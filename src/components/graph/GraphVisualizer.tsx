"use client";

import { useEffect } from "react";
import { GRAPH_COLORS } from "@/core/constants/colors";
import { GraphAlgorithm } from "@/core/types/graph";
import { getGraphAlgorithmMeta } from "@/core/utils/graph";
import { useGraphVisualizer } from "@/hooks/useGraphVisualizer";
import { GraphCanvas } from "./GraphCanvas";
import { GraphControls } from "./GraphControls";
import { GraphInfo } from "./GraphInfo";

type Props = {
  algorithm: GraphAlgorithm;
};

export function GraphVisualizer({ algorithm }: Props) {
  const meta = getGraphAlgorithmMeta(algorithm);

  const {
    graph,
    graphSize,
    setGraphSize,
    setDirected,
    startNodeId,
    setStartNodeId,
    speed,
    setSpeed,
    currentStep,
    currentStepIndex,
    totalSteps,
    isPlaying,
    generateDefaultGraph,
    randomizeWeights,
    start,
    pause,
    resume,
    reset,
  } = useGraphVisualizer(algorithm);

  useEffect(() => {
    generateDefaultGraph();
  }, [generateDefaultGraph]);

  return (
    <section className="flex flex-col gap-6">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
          Graph Algorithms
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {meta.label}
        </h1>
      </div>

      <GraphControls
        graphSize={graphSize}
        onGraphSizeChange={setGraphSize}
        directed={graph.directed}
        onDirectedChange={setDirected}
        startNodeId={startNodeId}
        availableNodeIds={graph.nodes.map((node) => node.id)}
        onStartNodeChange={setStartNodeId}
        speed={speed}
        onSpeedChange={setSpeed}
        isPlaying={isPlaying}
        hasSteps={totalSteps > 0}
        onResetGraph={generateDefaultGraph}
        onRandomizeWeights={randomizeWeights}
        onStart={start}
        onPause={pause}
        onResume={resume}
        onResetPlayback={reset}
      />

      <GraphCanvas algorithm={algorithm} step={currentStep} />

      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${GRAPH_COLORS.defaultNode.legend}`} />
          Default Node
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${GRAPH_COLORS.visitedNode.legend}`} />
          Discovered Node
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${GRAPH_COLORS.currentNode.legend}`} />
          Current Node
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${GRAPH_COLORS.activeEdge.legend}`} />
          Active Edge
        </div>
      </div>

      <GraphInfo
        algorithm={algorithm}
        description={currentStep.description}
        step={currentStepIndex}
        totalSteps={totalSteps}
        traversalOrder={currentStep.traversalOrder}
      />
    </section>
  );
}