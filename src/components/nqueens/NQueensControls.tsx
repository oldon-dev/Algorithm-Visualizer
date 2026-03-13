import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import { MAX_NQUEENS_SIZE, MIN_NQUEENS_SIZE } from "@/core/constants/nqueens";

type Props = {
  size: number;
  onSizeChange: (value: number) => void;
  speed: number;
  onSpeedChange: (value: number) => void;
  isPlaying: boolean;
  hasSteps: boolean;
  onReset: () => void;
  onSolve: () => void;
  onPause: () => void;
  onResume: () => void;
};

function getSpeedLabel(speed: number) {
  if (speed <= 30) return "Very Fast";
  if (speed <= 60) return "Fast";
  if (speed <= 100) return "Normal";
  if (speed <= 160) return "Slow";
  return "Very Slow";
}

export function NQueensControls({
  size,
  onSizeChange,
  speed,
  onSpeedChange,
  isPlaying,
  hasSteps,
  onReset,
  onSolve,
  onPause,
  onResume,
}: Props) {
  return (
    <Card className="p-5 lg:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr_auto] xl:items-end">
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Board Size: <span className="text-white">{size} × {size}</span>
          </label>
          <Slider
            value={size}
            min={MIN_NQUEENS_SIZE}
            max={MAX_NQUEENS_SIZE}
            step={1}
            onValueChange={onSizeChange}
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Speed: <span className="text-white">{getSpeedLabel(speed)}</span>
          </label>
          <Slider
            value={speed}
            min={20}
            max={220}
            step={10}
            onValueChange={onSpeedChange}
          />
        </div>

        <div className="flex flex-wrap gap-2 xl:justify-end">
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>

          {!hasSteps && <Button onClick={onSolve}>Solve</Button>}
          {hasSteps && !isPlaying && <Button onClick={onResume}>Resume</Button>}
          {isPlaying && <Button onClick={onPause}>Pause</Button>}
        </div>
      </div>
    </Card>
  );
}