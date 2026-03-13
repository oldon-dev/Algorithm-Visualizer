import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";

type Props = {
  speed: number;
  onSpeedChange: (value: number) => void;
  isPlaying: boolean;
  hasSteps: boolean;
  onLoadSample: () => void;
  onClearBoard: () => void;
  onSolve: () => void;
  onPause: () => void;
  onResume: () => void;
};

function getSpeedLabel(speed: number) {
  if (speed <= 30) return "Very Fast";
  if (speed <= 60) return "Fast";
  if (speed <= 120) return "Normal";
  if (speed <= 180) return "Slow";
  return "Very Slow";
}

export function SudokuControls({
  speed,
  onSpeedChange,
  isPlaying,
  hasSteps,
  onLoadSample,
  onClearBoard,
  onSolve,
  onPause,
  onResume,
}: Props) {
  return (
    <Card className="p-5 lg:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_auto] xl:items-end">
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
          <Button variant="secondary" onClick={onLoadSample}>
            Load Sample
          </Button>
          <Button variant="secondary" onClick={onClearBoard}>
            Clear
          </Button>

          {!hasSteps && <Button onClick={onSolve}>Solve</Button>}
          {hasSteps && !isPlaying && <Button onClick={onResume}>Resume</Button>}
          {isPlaying && <Button onClick={onPause}>Pause</Button>}
        </div>
      </div>
    </Card>
  );
}