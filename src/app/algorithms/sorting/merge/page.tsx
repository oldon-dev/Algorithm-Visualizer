import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function MergeSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="merge" />
    </AppShell>
  );
}