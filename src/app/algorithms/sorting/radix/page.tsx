import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function RadixSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="radix" />
    </AppShell>
  );
}