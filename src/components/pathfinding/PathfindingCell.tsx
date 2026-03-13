"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { GridCell } from "@/core/types/pathfinding";
import { PATHFINDING_COLORS } from "@/core/constants/colors";

type Props = {
  cell: GridCell;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
};

function getAnimationClass(type: GridCell["type"]) {
  switch (type) {
    case "empty":
      return "path-animate-empty";
    case "wall":
      return "path-animate-wall";
    case "start":
      return "path-animate-start";
    case "target":
      return "path-animate-target";
    case "visited":
      return "path-animate-visited";
    case "path":
      return "path-animate-path";
    default:
      return "";
  }
}

export function PathfindingCell({
  cell,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: Props) {
  const previousType = useRef(cell.type);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (previousType.current !== cell.type) {
      const nextClass = getAnimationClass(cell.type);
      setAnimationClass("");
      const frame = requestAnimationFrame(() => {
        setAnimationClass(nextClass);
      });
      previousType.current = cell.type;

      return () => cancelAnimationFrame(frame);
    }
  }, [cell.type]);

  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      className={clsx(
        "path-cell aspect-square rounded-[4px] border border-white/5 transition-colors duration-300 ease-out",
        animationClass,
        cell.type === "empty" && PATHFINDING_COLORS.empty.cell,
        cell.type === "wall" && PATHFINDING_COLORS.wall.cell,
        cell.type === "start" && PATHFINDING_COLORS.start.cell,
        cell.type === "target" && PATHFINDING_COLORS.target.cell,
        cell.type === "visited" && PATHFINDING_COLORS.visited.cell,
        cell.type === "path" && PATHFINDING_COLORS.path.cell
      )}
    />
  );
}