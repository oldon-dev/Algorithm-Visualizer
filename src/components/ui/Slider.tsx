"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";

type Props = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: number) => void;
};

export function Slider({ value, min, max, step = 1, onValueChange }: Props) {
  return (
    <SliderPrimitive.Root
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(values) => onValueChange(values[0])}
      className="relative flex h-6 w-full touch-none select-none items-center"
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/10">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-sky-500" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-sky-300 bg-white shadow-[0_0_0_6px_rgba(14,165,233,0.18)] transition hover:scale-105 focus:outline-none" />
    </SliderPrimitive.Root>
  );
}