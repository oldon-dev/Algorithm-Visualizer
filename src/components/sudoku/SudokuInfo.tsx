import { Card } from "@/components/ui/Card";
import { BacktrackingAlgorithm } from "@/core/types/backtracking";
import { getBacktrackingAlgorithmMeta } from "@/core/utils/sudoku";

type Props = {
  algorithm: BacktrackingAlgorithm;
  description: string;
};

export function SudokuInfo({ algorithm, description }: Props) {
  const meta = getBacktrackingAlgorithmMeta(algorithm);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
      <Card className="p-5">
        <h3 className="text-lg font-semibold text-white">Current Step</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
      </Card>

      <Card className="p-5">
        <p className="text-xs uppercase tracking-wide text-slate-400">Technique</p>
        <p className="mt-2 text-2xl font-semibold text-white">{meta.technique}</p>
      </Card>

      <Card className="p-5">
        <p className="text-xs uppercase tracking-wide text-slate-400">Guaranteed</p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {meta.guaranteesSolution ? "Yes" : "No"}
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-xs uppercase tracking-wide text-slate-400">Category</p>
        <p className="mt-2 text-2xl font-semibold text-white">Backtracking</p>
      </Card>
    </div>
  );
}