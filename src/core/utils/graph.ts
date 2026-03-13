import {
  DEFAULT_GRAPH_START_NODE_ID,
  GRAPH_ALGORITHMS,
  GRAPH_PRESETS,
} from "@/core/constants/graph";
import { GraphAlgorithm, GraphData, GraphEdge, GraphSize } from "@/core/types/graph";

export function getGraphAlgorithmMeta(algorithm: GraphAlgorithm) {
  const meta = GRAPH_ALGORITHMS.find((item) => item.value === algorithm);

  if (!meta) {
    throw new Error(`Graph metadata not found for algorithm: ${algorithm}`);
  }

  return meta;
}

export function cloneGraph(graph: GraphData): GraphData {
  return {
    directed: graph.directed,
    size: graph.size,
    nodes: graph.nodes.map((node) => ({ ...node })),
    edges: graph.edges.map((edge) => ({ ...edge })),
  };
}

export function getGraphBySize(size: GraphSize): GraphData {
  return cloneGraph(GRAPH_PRESETS[size]);
}

export function getDefaultGraphData(): GraphData {
  return getGraphBySize("medium");
}

export function getDefaultGraphStartNodeId(graph: GraphData): string {
  const exists = graph.nodes.some((node) => node.id === DEFAULT_GRAPH_START_NODE_ID);

  if (exists) {
    return DEFAULT_GRAPH_START_NODE_ID;
  }

  return graph.nodes[0]?.id ?? "";
}

export function getGraphNeighbors(
  graph: GraphData,
  nodeId: string
): { nodeId: string; edgeId: string; weight: number }[] {
  const neighbors: { nodeId: string; edgeId: string; weight: number }[] = [];

  for (const edge of graph.edges) {
    if (edge.from === nodeId) {
      neighbors.push({
        nodeId: edge.to,
        edgeId: edge.id,
        weight: edge.weight,
      });
    }

    if (!graph.directed && edge.to === nodeId) {
      neighbors.push({
        nodeId: edge.from,
        edgeId: edge.id,
        weight: edge.weight,
      });
    }
  }

  neighbors.sort((a, b) => a.nodeId.localeCompare(b.nodeId));

  return neighbors;
}

export function randomizeGraphWeights(graph: GraphData): GraphData {
  return {
    ...cloneGraph(graph),
    edges: graph.edges.map((edge) => ({
      ...edge,
      weight: Math.floor(Math.random() * 9) + 1,
    })),
  };
}

export function getEdgeById(graph: GraphData, edgeId?: string): GraphEdge | undefined {
  if (!edgeId) {
    return undefined;
  }

  return graph.edges.find((edge) => edge.id === edgeId);
}