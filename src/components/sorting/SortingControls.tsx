import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";

type Props = {
  arraySize: number;
  onArraySizeChange: (value: number) => void;
  speed: number;
  onSpeedChange: (value: number) => void;
  isPlaying: boolean;
  hasSteps: boolean;
  onGenerate: () => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
};

function getSpeedLabel(speed: number) {
  if (speed <= 40) return "Very Fast";
  if (speed <= 80) return "Fast";
  if (speed <= 140) return "Normal";
  if (speed <= 220) return "Slow";
  return "Very Slow";
}

export function SortingControls({
  arraySize,
  onArraySizeChange,
  speed,
  onSpeedChange,
  isPlaying,
  hasSteps,
  onGenerate,
  onStart,
  onPause,
  onResume,
  onReset,
}: Props) {
  return (
    <Card className="p-5 lg:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr_auto] xl:items-end">
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Array Size: <span className="text-white">{arraySize}</span>
          </label>
          <Slider
            value={arraySize}
            min={8}
            max={60}
            step={1}
            onValueChange={onArraySizeChange}
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Speed: <span className="text-white">{getSpeedLabel(speed)}</span>
          </label>
          <Slider
            value={speed}
            min={20}
            max={260}
            step={10}
            onValueChange={onSpeedChange}
          />
        </div>

        <div className="flex flex-wrap gap-2 xl:justify-end">
          <Button variant="secondary" onClick={onGenerate}>
            New Array
          </Button>

          {!hasSteps && <Button onClick={onStart}>Start</Button>}

          {hasSteps && !isPlaying && <Button onClick={onResume}>Resume</Button>}

          {isPlaying && <Button onClick={onPause}>Pause</Button>}

          <Button variant="ghost" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}