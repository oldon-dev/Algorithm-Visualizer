"use client";

import { useState } from "react";
import { GridCell } from "@/core/types/pathfinding";
import { PathfindingCell } from "./PathfindingCell";

type Props = {
  grid: GridCell[][];
  tool: "wall" | "start" | "target";
  onCellClick: (row: number, col: number) => void;
};

export function PathfindingGrid({ grid, tool, onCellClick }: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true);
    onCellClick(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isMouseDown) return;
    if (tool !== "wall") return;
    onCellClick(row, col);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      className="rounded-2xl border border-white/10 bg-[#0b1728] p-4 lg:p-6"
      onMouseLeave={handleMouseUp}
    >
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
        }}
      >
        {grid.flat().map((cell) => (
          <PathfindingCell
            key={`${cell.row}-${cell.col}`}
            cell={cell}
            onMouseDown={() => handleMouseDown(cell.row, cell.col)}
            onMouseEnter={() => handleMouseEnter(cell.row, cell.col)}
            onMouseUp={handleMouseUp}
          />
        ))}
      </div>
    </div>
  );
}