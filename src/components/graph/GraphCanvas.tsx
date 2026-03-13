import clsx from "clsx";
import { GRAPH_COLORS } from "@/core/constants/colors";
import { GraphAlgorithm, GraphStep } from "@/core/types/graph";

type Props = {
  algorithm: GraphAlgorithm;
  step: GraphStep;
};

export function GraphCanvas({ algorithm, step }: Props) {
  const visitedSet = new Set(step.visitedNodeIds);

  const getNodeById = (id: string) => step.graph.nodes.find((node) => node.id === id);

  const getNodeDisplayLabel = (nodeId: string, defaultLabel: string) => {
    const value = step.nodeValues[nodeId];

    if (value === undefined) {
      return defaultLabel;
    }

    if (value === Number.POSITIVE_INFINITY) {
      return `${defaultLabel} = ∞`;
    }

    return `${defaultLabel} = ${value}`;
  };

  const showWeights = algorithm === "dijkstra";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1728] p-4 lg:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 760 380"
          className="h-[460px] w-full min-w-[760px]"
          role="img"
          aria-label="Graph visualization"
        >
          <defs>
            <marker
              id="graph-arrow-default"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" className="fill-slate-600" />
            </marker>

            <marker
              id="graph-arrow-active"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" className="fill-amber-400" />
            </marker>
          </defs>

          {step.graph.edges.map((edge) => {
            const from = getNodeById(edge.from);
            const to = getNodeById(edge.to);

            if (!from || !to) {
              return null;
            }

            const isActive = step.activeEdgeId === edge.id;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;

            return (
              <g key={edge.id}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={clsx(
                    "transition-all duration-200",
                    isActive ? GRAPH_COLORS.activeEdge.stroke : GRAPH_COLORS.edge.stroke
                  )}
                  strokeWidth={isActive ? 5 : 3}
                  strokeLinecap="round"
                  markerEnd={
                    step.graph.directed
                      ? `url(#${isActive ? "graph-arrow-active" : "graph-arrow-default"})`
                      : undefined
                  }
                />

                {showWeights && (
                  <>
                    <rect
                      x={midX - 16}
                      y={midY - 14}
                      width={32}
                      height={22}
                      rx={8}
                      className="fill-slate-900/95"
                    />
                    <text
                      x={midX}
                      y={midY + 1}
                      textAnchor="middle"
                      className="fill-cyan-300 text-[12px] font-semibold"
                    >
                      {edge.weight}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {step.graph.nodes.map((node) => {
            const isCurrent = step.currentNodeId === node.id;
            const isVisited = visitedSet.has(node.id);
            const label = getNodeDisplayLabel(node.id, node.label);

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={30}
                  className={clsx(
                    "transition-all duration-200",
                    isCurrent && GRAPH_COLORS.currentNode.fill,
                    !isCurrent && isVisited && GRAPH_COLORS.visitedNode.fill,
                    !isCurrent && !isVisited && GRAPH_COLORS.defaultNode.fill
                  )}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  className="fill-white text-[13px] font-semibold"
                >
                  {node.label}
                </text>

                {step.nodeValues[node.id] !== undefined && (
                  <text
                    x={node.x}
                    y={node.y + 50}
                    textAnchor="middle"
                    className="fill-cyan-300 text-[12px] font-medium"
                  >
                    {label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}