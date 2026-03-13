import { GraphData, GraphStep } from "@/core/types/graph";
import { cloneGraph, getGraphNeighbors } from "@/core/utils/graph";

export function bfsTraversalSteps(
  inputGraph: GraphData,
  startNodeId: string
): GraphStep[] {
  const graph = cloneGraph(inputGraph);
  const steps: GraphStep[] = [];
  const visited = new Set<string>();
  const traversalOrder: string[] = [];
  const queue: string[] = [];
  const nodeValues: Record<string, number> = {};

  if (!graph.nodes.some((node) => node.id === startNodeId)) {
    return [
      {
        graph,
        visitedNodeIds: [],
        traversalOrder: [],
        nodeValues: {},
        description: `Start node ${startNodeId} does not exist in the graph`,
      },
    ];
  }

  steps.push({
    graph,
    visitedNodeIds: [],
    traversalOrder: [],
    nodeValues: {},
    description: `Starting BFS traversal from node ${startNodeId}`,
  });

  visited.add(startNodeId);
  nodeValues[startNodeId] = 0;
  queue.push(startNodeId);

  steps.push({
    graph,
    currentNodeId: startNodeId,
    visitedNodeIds: [...visited],
    traversalOrder: [],
    nodeValues: { ...nodeValues },
    description: `Enqueuing start node ${startNodeId} at level 0`,
  });

  while (queue.length > 0) {
    const current = queue.shift() as string;
    traversalOrder.push(current);

    steps.push({
      graph,
      currentNodeId: current,
      visitedNodeIds: [...visited],
      traversalOrder: [...traversalOrder],
      nodeValues: { ...nodeValues },
      description: `Visiting node ${current}`,
    });

    const neighbors = getGraphNeighbors(graph, current);

    for (const neighbor of neighbors) {
      steps.push({
        graph,
        currentNodeId: current,
        visitedNodeIds: [...visited],
        activeEdgeId: neighbor.edgeId,
        traversalOrder: [...traversalOrder],
        nodeValues: { ...nodeValues },
        description: `Inspecting edge from ${current} to ${neighbor.nodeId}`,
      });

      if (!visited.has(neighbor.nodeId)) {
        visited.add(neighbor.nodeId);
        nodeValues[neighbor.nodeId] = (nodeValues[current] ?? 0) + 1;
        queue.push(neighbor.nodeId);

        steps.push({
          graph,
          currentNodeId: neighbor.nodeId,
          visitedNodeIds: [...visited],
          activeEdgeId: neighbor.edgeId,
          traversalOrder: [...traversalOrder],
          nodeValues: { ...nodeValues },
          description: `Discovered node ${neighbor.nodeId} at level ${nodeValues[neighbor.nodeId]}`,
        });
      }
    }
  }

  steps.push({
    graph,
    visitedNodeIds: [...visited],
    traversalOrder: [...traversalOrder],
    nodeValues: { ...nodeValues },
    description: "BFS traversal completed",
  });

  return steps;
}