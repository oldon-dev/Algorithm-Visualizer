import { GraphAlgorithm, GraphData } from "@/core/types/graph";
import { bfsTraversalSteps } from "./bfsTraversal";
import { dfsTraversalSteps } from "./dfsTraversal";
import { dijkstraSteps } from "./dijkstra";

export function getGraphSteps(
  algorithm: GraphAlgorithm,
  graph: GraphData,
  startNodeId: string
) {
  switch (algorithm) {
    case "bfs":
      return bfsTraversalSteps(graph, startNodeId);
    case "dfs":
      return dfsTraversalSteps(graph, startNodeId);
    case "dijkstra":
      return dijkstraSteps(graph, startNodeId);
    default:
      throw new Error(`Unknown graph algorithm: ${algorithm}`);
  }
}