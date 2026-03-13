import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function InsertionSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="insertion" />
    </AppShell>
  );
}