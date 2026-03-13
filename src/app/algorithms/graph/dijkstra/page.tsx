import { AppShell } from "@/components/layout/AppShell";
import { GraphVisualizer } from "@/components/graph/GraphVisualizer";

export default function GraphDijkstraPage() {
  return (
    <AppShell>
      <GraphVisualizer algorithm="dijkstra" />
    </AppShell>
  );
}