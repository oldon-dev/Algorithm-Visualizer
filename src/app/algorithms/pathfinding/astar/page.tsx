import { AppShell } from "@/components/layout/AppShell";
import { PathfindingVisualizer } from "@/components/pathfinding/PathfindingVisualizer";

export default function AStarPage() {
  return (
    <AppShell>
      <PathfindingVisualizer algorithm="astar" />
    </AppShell>
  );
}