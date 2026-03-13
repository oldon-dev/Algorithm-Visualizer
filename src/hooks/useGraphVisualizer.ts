"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getGraphSteps } from "@/core/algorithms/graph";
import { DEFAULT_GRAPH_SPEED } from "@/core/constants/graph";
import { GraphAlgorithm, GraphData, GraphSize, GraphStep } from "@/core/types/graph";
import {
  getDefaultGraphStartNodeId,
  getGraphBySize,
  randomizeGraphWeights,
} from "@/core/utils/graph";

export function useGraphVisualizer(algorithm: GraphAlgorithm) {
  const [graphSize, setGraphSize] = useState<GraphSize>("medium");
  const initialGraph = useMemo(() => getGraphBySize("medium"), []);
  const initialStartNodeId = useMemo(
    () => getDefaultGraphStartNodeId(initialGraph),
    [initialGraph]
  );

  const [graph, setGraph] = useState<GraphData>(initialGraph);
  const [startNodeId, setStartNodeId] = useState<string>(initialStartNodeId);
  const [steps, setSteps] = useState<GraphStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_GRAPH_SPEED);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearPlaybackTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const loadGraphBySize = useCallback(
    (size: GraphSize) => {
      const nextGraph = getGraphBySize(size);
      const nextStartNodeId = getDefaultGraphStartNodeId(nextGraph);

      clearPlaybackTimer();
      setIsPlaying(false);
      setGraphSize(size);
      setGraph(nextGraph);
      setStartNodeId(nextStartNodeId);
      setSteps([]);
      setCurrentStepIndex(0);
    },
    [clearPlaybackTimer]
  );

  const setDirected = useCallback(
    (directed: boolean) => {
      clearPlaybackTimer();
      setIsPlaying(false);
      setGraph((prev) => ({
        ...prev,
        directed,
      }));
      setSteps([]);
      setCurrentStepIndex(0);
    },
    [clearPlaybackTimer]
  );

  const randomizeWeights = useCallback(() => {
    const nextGraph = randomizeGraphWeights(graph);

    clearPlaybackTimer();
    setIsPlaying(false);
    setGraph(nextGraph);
    setSteps([]);
    setCurrentStepIndex(0);
  }, [clearPlaybackTimer, graph]);

  const generateDefaultGraph = useCallback(() => {
    const nextGraph = getGraphBySize(graphSize);
    const nextStartNodeId = getDefaultGraphStartNodeId(nextGraph);

    clearPlaybackTimer();
    setIsPlaying(false);
    setGraph(nextGraph);
    setStartNodeId(nextStartNodeId);
    setSteps([]);
    setCurrentStepIndex(0);
  }, [clearPlaybackTimer, graphSize]);

  const start = useCallback(() => {
    const computedSteps = getGraphSteps(algorithm, graph, startNodeId);

    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(computedSteps.length > 1);
  }, [algorithm, graph, startNodeId]);

  const pause = useCallback(() => {
    clearPlaybackTimer();
    setIsPlaying(false);
  }, [clearPlaybackTimer]);

  const resume = useCallback(() => {
    if (steps.length === 0 || currentStepIndex >= steps.length - 1) {
      return;
    }

    setIsPlaying(true);
  }, [currentStepIndex, steps.length]);

  const reset = useCallback(() => {
    clearPlaybackTimer();
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, [clearPlaybackTimer]);

  useEffect(() => {
    clearPlaybackTimer();
    setIsPlaying(false);
    setSteps([]);
    setCurrentStepIndex(0);
  }, [algorithm, startNodeId, graph, clearPlaybackTimer]);

  useEffect(() => {
    clearPlaybackTimer();

    if (!isPlaying || steps.length === 0) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearPlaybackTimer();
          setIsPlaying(false);
          return prev;
        }

        return prev + 1;
      });
    }, speed);

    return () => clearPlaybackTimer();
  }, [clearPlaybackTimer, isPlaying, speed, steps]);

  useEffect(() => {
    return () => clearPlaybackTimer();
  }, [clearPlaybackTimer]);

  const currentStep = useMemo<GraphStep>(() => {
    if (steps.length === 0) {
      return {
        graph,
        visitedNodeIds: [],
        traversalOrder: [],
        nodeValues: {},
        description: "Choose a graph, choose a start node, and start the traversal",
      };
    }
  
    return steps[currentStepIndex] ?? steps[steps.length - 1];
  }, [currentStepIndex, graph, steps]);

  return {
    graph,
    graphSize,
    setGraphSize: loadGraphBySize,
    setDirected,
    startNodeId,
    setStartNodeId,
    speed,
    setSpeed,
    currentStep,
    currentStepIndex,
    totalSteps: steps.length,
    isPlaying,
    generateDefaultGraph,
    randomizeWeights,
    start,
    pause,
    resume,
    reset,
  };
}