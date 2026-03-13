import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function TimSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="tim" />
    </AppShell>
  );
}