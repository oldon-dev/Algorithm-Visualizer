import { AppShell } from "@/components/layout/AppShell";
import { PathfindingVisualizer } from "@/components/pathfinding/PathfindingVisualizer";

export default function BFSPage() {
  return (
    <AppShell>
      <PathfindingVisualizer algorithm="bfs" />
    </AppShell>
  );
}