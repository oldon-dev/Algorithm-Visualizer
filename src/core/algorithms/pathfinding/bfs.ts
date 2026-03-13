import { GridCell, PathfindingStep, Position } from "@/core/types/pathfinding";
import {
  cloneGrid,
  findCellPosition,
  getNeighbors,
  isSamePosition,
  positionKey,
} from "@/core/utils/pathfinding";

export function bfsSteps(inputGrid: GridCell[][]): PathfindingStep[] {
  const grid = cloneGrid(inputGrid);
  const steps: PathfindingStep[] = [];

  const start = findCellPosition(grid, "start");
  const target = findCellPosition(grid, "target");

  if (!start || !target) {
    return [
      {
        grid,
        description: "Start or target node is missing.",
      },
    ];
  }

  const queue: Position[] = [start];
  const visited = new Set<string>([positionKey(start)]);
  const previous = new Map<string, Position>();

  steps.push({
    grid: cloneGrid(grid),
    description: "Starting Breadth-First Search.",
  });

  let found = false;

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (!isSamePosition(current, start) && !isSamePosition(current, target)) {
      grid[current.row][current.col].type = "visited";
      steps.push({
        grid: cloneGrid(grid),
        description: `Visiting node (${current.row}, ${current.col}).`,
      });
    }

    if (isSamePosition(current, target)) {
      found = true;
      break;
    }

    for (const neighbor of getNeighbors(current, grid)) {
      const neighborCell = grid[neighbor.row][neighbor.col];
      const key = positionKey(neighbor);

      if (visited.has(key)) continue;
      if (neighborCell.type === "wall") continue;

      visited.add(key);
      previous.set(key, current);
      queue.push(neighbor);
    }
  }

  if (!found) {
    steps.push({
      grid: cloneGrid(grid),
      description: "No path found.",
    });
    return steps;
  }

  let cursor: Position | undefined = target;
  const path: Position[] = [];

  while (cursor && !isSamePosition(cursor, start)) {
    path.push(cursor);
    cursor = previous.get(positionKey(cursor));
  }

  path.reverse();

  for (const position of path) {
    if (!isSamePosition(position, start) && !isSamePosition(position, target)) {
      grid[position.row][position.col].type = "path";
      steps.push({
        grid: cloneGrid(grid),
        description: `Building shortest path through (${position.row}, ${position.col}).`,
      });
    }
  }

  steps.push({
    grid: cloneGrid(grid),
    description: "Shortest path found.",
  });

  return steps;
}