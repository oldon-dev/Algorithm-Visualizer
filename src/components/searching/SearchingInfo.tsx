import { Card } from "@/components/ui/Card";
import { SearchingAlgorithm } from "@/core/types/searching";
import { getSearchingAlgorithmMeta } from "@/core/utils/searching";

type Props = {
  algorithm: SearchingAlgorithm;
  description: string;
  step: number;
  totalSteps: number;
};

export function SearchingInfo({
  algorithm,
  description,
  step,
  totalSteps,
}: Props) {
  const meta = getSearchingAlgorithmMeta(algorithm);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
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
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Sorted Array
        </p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {meta.requiresSortedArray ? "Required" : "Not Required"}
        </p>
      </Card>
    </div>
  );
}