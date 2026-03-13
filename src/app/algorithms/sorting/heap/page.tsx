import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function HeapSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="heap" />
    </AppShell>
  );
}