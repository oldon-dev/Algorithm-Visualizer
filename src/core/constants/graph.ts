import { GraphAlgorithmMeta, GraphData, GraphSize } from "@/core/types/graph";

export const DEFAULT_GRAPH_SPEED = 500;
export const MIN_GRAPH_SPEED = 100;
export const MAX_GRAPH_SPEED = 1200;
export const GRAPH_SPEED_STEP = 50;

export const GRAPH_ALGORITHMS: GraphAlgorithmMeta[] = [
  {
    value: "bfs",
    label: "Breadth-First Search Traversal",
    description:
      "A graph traversal algorithm that explores neighbors level by level using a queue.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    graphType: "Directed / Undirected",
  },
  {
    value: "dfs",
    label: "Depth-First Search Traversal",
    description:
      "A graph traversal algorithm that explores as deep as possible along each branch before backtracking.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    graphType: "Directed / Undirected",
  },
  {
    value: "dijkstra",
    label: "Dijkstra’s Shortest Path",
    description:
      "A shortest path algorithm that repeatedly selects the unvisited node with the smallest known distance.",
    timeComplexity: "O(V²)",
    spaceComplexity: "O(V)",
    graphType: "Weighted Directed / Undirected",
  },
];

export const DEFAULT_GRAPH_START_NODE_ID = "A";

export const SMALL_GRAPH_DATA: GraphData = {
  size: "small",
  directed: false,
  nodes: [
    { id: "A", label: "A", x: 120, y: 120 },
    { id: "B", label: "B", x: 300, y: 70 },
    { id: "C", label: "C", x: 300, y: 200 },
    { id: "D", label: "D", x: 500, y: 120 },
  ],
  edges: [
    { id: "A-B", from: "A", to: "B", weight: 2 },
    { id: "A-C", from: "A", to: "C", weight: 4 },
    { id: "B-D", from: "B", to: "D", weight: 3 },
    { id: "C-D", from: "C", to: "D", weight: 1 },
  ],
};

export const MEDIUM_GRAPH_DATA: GraphData = {
  size: "medium",
  directed: false,
  nodes: [
    { id: "A", label: "A", x: 100, y: 80 },
    { id: "B", label: "B", x: 280, y: 60 },
    { id: "C", label: "C", x: 470, y: 90 },
    { id: "D", label: "D", x: 120, y: 240 },
    { id: "E", label: "E", x: 320, y: 220 },
    { id: "F", label: "F", x: 540, y: 250 },
  ],
  edges: [
    { id: "A-B", from: "A", to: "B", weight: 2 },
    { id: "A-D", from: "A", to: "D", weight: 5 },
    { id: "B-C", from: "B", to: "C", weight: 1 },
    { id: "B-E", from: "B", to: "E", weight: 4 },
    { id: "C-F", from: "C", to: "F", weight: 3 },
    { id: "D-E", from: "D", to: "E", weight: 2 },
    { id: "E-F", from: "E", to: "F", weight: 6 },
  ],
};

export const LARGE_GRAPH_DATA: GraphData = {
  size: "large",
  directed: false,
  nodes: [
    { id: "A", label: "A", x: 80, y: 90 },
    { id: "B", label: "B", x: 220, y: 50 },
    { id: "C", label: "C", x: 380, y: 60 },
    { id: "D", label: "D", x: 560, y: 90 },
    { id: "E", label: "E", x: 120, y: 250 },
    { id: "F", label: "F", x: 280, y: 220 },
    { id: "G", label: "G", x: 440, y: 240 },
    { id: "H", label: "H", x: 620, y: 250 },
  ],
  edges: [
    { id: "A-B", from: "A", to: "B", weight: 3 },
    { id: "A-E", from: "A", to: "E", weight: 6 },
    { id: "B-C", from: "B", to: "C", weight: 2 },
    { id: "B-F", from: "B", to: "F", weight: 5 },
    { id: "C-D", from: "C", to: "D", weight: 4 },
    { id: "C-G", from: "C", to: "G", weight: 1 },
    { id: "D-H", from: "D", to: "H", weight: 7 },
    { id: "E-F", from: "E", to: "F", weight: 2 },
    { id: "F-G", from: "F", to: "G", weight: 3 },
    { id: "G-H", from: "G", to: "H", weight: 2 },
    { id: "E-B", from: "E", to: "B", weight: 4 },
  ],
};

export const GRAPH_PRESETS: Record<GraphSize, GraphData> = {
  small: SMALL_GRAPH_DATA,
  medium: MEDIUM_GRAPH_DATA,
  large: LARGE_GRAPH_DATA,
};