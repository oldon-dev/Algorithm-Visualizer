import { Card } from "@/components/ui/Card";
import { GraphAlgorithm } from "@/core/types/graph";
import { getGraphAlgorithmMeta } from "@/core/utils/graph";

type Props = {
  algorithm: GraphAlgorithm;
  description: string;
  step: number;
  totalSteps: number;
  traversalOrder: string[];
};

export function GraphInfo({
  algorithm,
  description,
  step,
  totalSteps,
  traversalOrder,
}: Props) {
  const meta = getGraphAlgorithmMeta(algorithm);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
      <Card className="p-5">
        <h3 className="text-lg font-semibold text-white">Current Step</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>

        <div className="mt-5 rounded-xl border border-sky-500/15 bg-sky-500/10 p-3">
          <p className="text-sm text-slate-200">
            Step <span className="font-semibold text-white">{step}</span>
            {totalSteps > 0 ? (
              <>
                {" "}
                of <span className="font-semibold text-white">{totalSteps - 1}</span>
              </>
            ) : null}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Traversal Order
          </p>
          <p className="mt-2 text-sm text-slate-200">
            {traversalOrder.length > 0 ? traversalOrder.join(" → ") : "—"}
          </p>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-xs uppercase tracking-wide text-slate-400">Time</p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {meta.timeComplexity}
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-xs uppercase tracking-wide text-slate-400">Space</p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {meta.spaceComplexity}
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-xs uppercase tracking-wide text-slate-400">Graph Type</p>
        <p className="mt-2 text-2xl font-semibold text-white">{meta.graphType}</p>
      </Card>
    </div>
  );
}