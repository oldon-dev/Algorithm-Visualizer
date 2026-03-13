import { GraphData, GraphStep } from "@/core/types/graph";
import { cloneGraph, getGraphNeighbors } from "@/core/utils/graph";

export function dijkstraSteps(
  inputGraph: GraphData,
  startNodeId: string
): GraphStep[] {
  const graph = cloneGraph(inputGraph);
  const steps: GraphStep[] = [];
  const nodeValues: Record<string, number> = {};
  const visited = new Set<string>();
  const traversalOrder: string[] = [];

  const nodeIds = graph.nodes.map((node) => node.id);

  if (!nodeIds.includes(startNodeId)) {
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

  for (const nodeId of nodeIds) {
    nodeValues[nodeId] = Number.POSITIVE_INFINITY;
  }

  nodeValues[startNodeId] = 0;

  steps.push({
    graph,
    visitedNodeIds: [],
    traversalOrder: [],
    nodeValues: { ...nodeValues },
    description: `Starting Dijkstra from node ${startNodeId}`,
  });

  while (visited.size < nodeIds.length) {
    let currentNodeId: string | undefined;
    let currentDistance = Number.POSITIVE_INFINITY;

    for (const nodeId of nodeIds) {
      if (!visited.has(nodeId) && nodeValues[nodeId] < currentDistance) {
        currentDistance = nodeValues[nodeId];
        currentNodeId = nodeId;
      }
    }

    if (!currentNodeId || currentDistance === Number.POSITIVE_INFINITY) {
      break;
    }

    visited.add(currentNodeId);
    traversalOrder.push(currentNodeId);

    steps.push({
      graph,
      currentNodeId,
      visitedNodeIds: [...visited],
      traversalOrder: [...traversalOrder],
      nodeValues: { ...nodeValues },
      description: `Selecting node ${currentNodeId} with current shortest distance ${currentDistance}`,
    });

    const neighbors = getGraphNeighbors(graph, currentNodeId);

    for (const neighbor of neighbors) {
      steps.push({
        graph,
        currentNodeId,
        visitedNodeIds: [...visited],
        activeEdgeId: neighbor.edgeId,
        traversalOrder: [...traversalOrder],
        nodeValues: { ...nodeValues },
        description: `Relaxing edge from ${currentNodeId} to ${neighbor.nodeId} with weight ${neighbor.weight}`,
      });

      if (visited.has(neighbor.nodeId)) {
        continue;
      }

      const nextDistance = nodeValues[currentNodeId] + neighbor.weight;

      if (nextDistance < nodeValues[neighbor.nodeId]) {
        nodeValues[neighbor.nodeId] = nextDistance;

        steps.push({
          graph,
          currentNodeId: neighbor.nodeId,
          visitedNodeIds: [...visited],
          activeEdgeId: neighbor.edgeId,
          traversalOrder: [...traversalOrder],
          nodeValues: { ...nodeValues },
          description: `Updated shortest distance to node ${neighbor.nodeId}: ${nextDistance}`,
        });
      }
    }
  }

  steps.push({
    graph,
    visitedNodeIds: [...visited],
    traversalOrder: [...traversalOrder],
    nodeValues: { ...nodeValues },
    description: "Dijkstra completed",
  });

  return steps;
}