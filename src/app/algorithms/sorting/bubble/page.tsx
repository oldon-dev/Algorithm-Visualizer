import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function BubbleSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="bubble" />
    </AppShell>
  );
}