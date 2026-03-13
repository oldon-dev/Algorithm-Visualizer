import { GraphData, GraphStep } from "@/core/types/graph";
import { cloneGraph, getGraphNeighbors } from "@/core/utils/graph";

export function dfsTraversalSteps(
  inputGraph: GraphData,
  startNodeId: string
): GraphStep[] {
  const graph = cloneGraph(inputGraph);
  const steps: GraphStep[] = [];
  const visited = new Set<string>();
  const traversalOrder: string[] = [];
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
    description: `Starting DFS traversal from node ${startNodeId}`,
  });

  nodeValues[startNodeId] = 0;

  function dfs(nodeId: string) {
    visited.add(nodeId);
    traversalOrder.push(nodeId);

    steps.push({
      graph,
      currentNodeId: nodeId,
      visitedNodeIds: [...visited],
      traversalOrder: [...traversalOrder],
      nodeValues: { ...nodeValues },
      description: `Visiting node ${nodeId}`,
    });

    const neighbors = getGraphNeighbors(graph, nodeId);

    for (const neighbor of neighbors) {
      steps.push({
        graph,
        currentNodeId: nodeId,
        visitedNodeIds: [...visited],
        activeEdgeId: neighbor.edgeId,
        traversalOrder: [...traversalOrder],
        nodeValues: { ...nodeValues },
        description: `Inspecting edge from ${nodeId} to ${neighbor.nodeId}`,
      });

      if (!visited.has(neighbor.nodeId)) {
        nodeValues[neighbor.nodeId] = (nodeValues[nodeId] ?? 0) + 1;

        steps.push({
          graph,
          currentNodeId: neighbor.nodeId,
          visitedNodeIds: [...visited],
          activeEdgeId: neighbor.edgeId,
          traversalOrder: [...traversalOrder],
          nodeValues: { ...nodeValues },
          description: `Discovered node ${neighbor.nodeId} at depth ${nodeValues[neighbor.nodeId]}`,
        });

        dfs(neighbor.nodeId);

        steps.push({
          graph,
          currentNodeId: nodeId,
          visitedNodeIds: [...visited],
          traversalOrder: [...traversalOrder],
          nodeValues: { ...nodeValues },
          description: `Backtracking to node ${nodeId}`,
        });
      }
    }
  }

  dfs(startNodeId);

  steps.push({
    graph,
    visitedNodeIds: [...visited],
    traversalOrder: [...traversalOrder],
    nodeValues: { ...nodeValues },
    description: "DFS traversal completed",
  });

  return steps;
}