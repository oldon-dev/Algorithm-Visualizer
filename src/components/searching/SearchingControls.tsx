import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import {
  MAX_SEARCHING_ARRAY_SIZE,
  MAX_SEARCHING_SPEED,
  MIN_SEARCHING_ARRAY_SIZE,
  MIN_SEARCHING_SPEED,
  SEARCHING_ARRAY_SIZE_STEP,
  SEARCHING_SPEED_STEP,
} from "@/core/constants/searching";

type Props = {
  arraySize: number;
  onArraySizeChange: (value: number) => void;
  target: number;
  onTargetChange: (value: number) => void;
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

export function SearchingControls({
  arraySize,
  onArraySizeChange,
  target,
  onTargetChange,
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
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr_1fr_auto] xl:items-end">
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Array Size: <span className="text-white">{arraySize}</span>
          </label>
          <Slider
            value={arraySize}
            min={MIN_SEARCHING_ARRAY_SIZE}
            max={MAX_SEARCHING_ARRAY_SIZE}
            step={SEARCHING_ARRAY_SIZE_STEP}
            onValueChange={onArraySizeChange}
          />
        </div>
  
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Target Value
          </label>
          <input
            type="number"
            value={target}
            onChange={(event) => onTargetChange(Number(event.target.value))}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-sky-500/50"
          />
        </div>
  
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Speed: <span className="text-white">{getSpeedLabel(speed)}</span>
          </label>
          <Slider
            value={speed}
            min={MIN_SEARCHING_SPEED}
            max={MAX_SEARCHING_SPEED}
            step={SEARCHING_SPEED_STEP}
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