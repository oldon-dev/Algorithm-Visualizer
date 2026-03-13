import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import {
  GRAPH_SPEED_STEP,
  MAX_GRAPH_SPEED,
  MIN_GRAPH_SPEED,
} from "@/core/constants/graph";
import { GraphSize } from "@/core/types/graph";

type Props = {
  graphSize: GraphSize;
  onGraphSizeChange: (value: GraphSize) => void;
  directed: boolean;
  onDirectedChange: (value: boolean) => void;
  startNodeId: string;
  availableNodeIds: string[];
  onStartNodeChange: (value: string) => void;
  speed: number;
  onSpeedChange: (value: number) => void;
  isPlaying: boolean;
  hasSteps: boolean;
  onResetGraph: () => void;
  onRandomizeWeights: () => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onResetPlayback: () => void;
};

function getSpeedLabel(speed: number) {
  if (speed <= 200) return "Very Fast";
  if (speed <= 400) return "Fast";
  if (speed <= 650) return "Normal";
  if (speed <= 900) return "Slow";
  return "Very Slow";
}

export function GraphControls({
  graphSize,
  onGraphSizeChange,
  directed,
  onDirectedChange,
  startNodeId,
  availableNodeIds,
  onStartNodeChange,
  speed,
  onSpeedChange,
  isPlaying,
  hasSteps,
  onResetGraph,
  onRandomizeWeights,
  onStart,
  onPause,
  onResume,
  onResetPlayback,
}: Props) {
  return (
    <Card className="p-5 lg:p-6">
      <div className="grid gap-6 xl:grid-cols-[180px_180px_180px_1fr_auto] xl:items-end">
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Graph Size
          </label>
          <select
            value={graphSize}
            onChange={(event) => onGraphSizeChange(event.target.value as GraphSize)}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-sky-500/50"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Start Node
          </label>
          <select
            value={startNodeId}
            onChange={(event) => onStartNodeChange(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-sky-500/50"
          >
            {availableNodeIds.map((nodeId) => (
              <option key={nodeId} value={nodeId}>
                {nodeId}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Edges
          </label>
          <button
            type="button"
            onClick={() => onDirectedChange(!directed)}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-left text-white transition hover:border-sky-500/50"
          >
            {directed ? "Directed" : "Undirected"}
          </button>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Speed: <span className="text-white">{getSpeedLabel(speed)}</span>
          </label>
          <Slider
            value={speed}
            min={MIN_GRAPH_SPEED}
            max={MAX_GRAPH_SPEED}
            step={GRAPH_SPEED_STEP}
            onValueChange={onSpeedChange}
          />
        </div>

        <div className="flex flex-wrap gap-2 xl:justify-end">
          <Button variant="secondary" onClick={onResetGraph}>
            Reset Graph
          </Button>

          <Button variant="secondary" onClick={onRandomizeWeights}>
            Randomize Weights
          </Button>

          {!hasSteps && <Button onClick={onStart}>Start</Button>}

          {hasSteps && !isPlaying && <Button onClick={onResume}>Resume</Button>}

          {isPlaying && <Button onClick={onPause}>Pause</Button>}

          <Button variant="ghost" onClick={onResetPlayback}>
            Reset Playback
          </Button>
        </div>
      </div>
    </Card>
  );
}