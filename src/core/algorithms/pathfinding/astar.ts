import { GridCell, PathfindingStep, Position } from "@/core/types/pathfinding";
import {
  cloneGrid,
  findCellPosition,
  getNeighbors,
  isSamePosition,
  positionKey,
} from "@/core/utils/pathfinding";

function heuristic(a: Position, b: Position): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function aStarSteps(inputGrid: GridCell[][]): PathfindingStep[] {
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

  const openSet: Position[] = [start];
  const openSetKeys = new Set<string>([positionKey(start)]);
  const previous = new Map<string, Position>();

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  gScore.set(positionKey(start), 0);
  fScore.set(positionKey(start), heuristic(start, target));

  steps.push({
    grid: cloneGrid(grid),
    description: "Starting A* Search.",
  });

  let found = false;

  while (openSet.length > 0) {
    let currentIndex = 0;

    for (let i = 1; i < openSet.length; i++) {
      const currentKey = positionKey(openSet[i]);
      const bestKey = positionKey(openSet[currentIndex]);

      const currentF = fScore.get(currentKey) ?? Infinity;
      const bestF = fScore.get(bestKey) ?? Infinity;

      if (currentF < bestF) {
        currentIndex = i;
      }
    }

    const current = openSet[currentIndex];
    openSet.splice(currentIndex, 1);
    openSetKeys.delete(positionKey(current));

    if (!isSamePosition(current, start) && !isSamePosition(current, target)) {
      grid[current.row][current.col].type = "visited";
      steps.push({
        grid: cloneGrid(grid),
        description: `Exploring node (${current.row}, ${current.col}) with the lowest estimated cost.`,
      });
    }

    if (isSamePosition(current, target)) {
      found = true;
      break;
    }

    for (const neighbor of getNeighbors(current, grid)) {
      const neighborCell = grid[neighbor.row][neighbor.col];
      if (neighborCell.type === "wall") continue;

      const neighborKey = positionKey(neighbor);
      const currentKey = positionKey(current);

      const tentativeG = (gScore.get(currentKey) ?? Infinity) + 1;

      if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
        previous.set(neighborKey, current);
        gScore.set(neighborKey, tentativeG);
        fScore.set(neighborKey, tentativeG + heuristic(neighbor, target));

        if (!openSetKeys.has(neighborKey)) {
          openSet.push(neighbor);
          openSetKeys.add(neighborKey);
        }
      }
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
        description: `Building best path through (${position.row}, ${position.col}).`,
      });
    }
  }

  steps.push({
    grid: cloneGrid(grid),
    description: "Path found with A* Search.",
  });

  return steps;
}