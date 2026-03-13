import { AppShell } from "@/components/layout/AppShell";
import { GraphVisualizer } from "@/components/graph/GraphVisualizer";

export default function GraphBfsPage() {
  return (
    <AppShell>
      <GraphVisualizer algorithm="bfs" />
    </AppShell>
  );
}