import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";

type Props = {
  speed: number;
  onSpeedChange: (value: number) => void;
  tool: "wall" | "start" | "target";
  onToolChange: (value: "wall" | "start" | "target") => void;
  isPlaying: boolean;
  hasSteps: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
};

export function PathfindingControls({
  speed,
  onSpeedChange,
  tool,
  onToolChange,
  isPlaying,
  hasSteps,
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
            Tool
          </label>
          <div className="flex gap-2">
            <Button
              variant={tool === "wall" ? "primary" : "secondary"}
              onClick={() => onToolChange("wall")}
            >
              Wall
            </Button>
            <Button
              variant={tool === "start" ? "primary" : "secondary"}
              onClick={() => onToolChange("start")}
            >
              Start
            </Button>
            <Button
              variant={tool === "target" ? "primary" : "secondary"}
              onClick={() => onToolChange("target")}
            >
              Target
            </Button>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Speed
          </label>
          <Slider
            value={speed}
            min={20}
            max={200}
            step={10}
            onValueChange={onSpeedChange}
          />
        </div>

        <div className="flex flex-wrap gap-2 xl:justify-end">
          {!hasSteps && <Button onClick={onStart}>Start</Button>}
          {hasSteps && !isPlaying && <Button onClick={onResume}>Resume</Button>}
          {isPlaying && <Button onClick={onPause}>Pause</Button>}
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}