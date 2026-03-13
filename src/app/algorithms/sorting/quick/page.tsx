import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function QuickSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="quick" />
    </AppShell>
  );
}