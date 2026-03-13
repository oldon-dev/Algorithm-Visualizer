import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function SelectionSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="selection" />
    </AppShell>
  );
}