export type GraphAlgorithm = "bfs" | "dfs" | "dijkstra";

export type GraphSize = "small" | "medium" | "large";

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  weight: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed: boolean;
  size: GraphSize;
}

export interface GraphStep {
  graph: GraphData;
  currentNodeId?: string;
  visitedNodeIds: string[];
  activeEdgeId?: string;
  traversalOrder: string[];
  nodeValues: Record<string, number>;
  description: string;
}

export interface GraphAlgorithmMeta {
  value: GraphAlgorithm;
  label: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  graphType: string;
}