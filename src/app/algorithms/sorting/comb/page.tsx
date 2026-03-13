import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function CombSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="comb" />
    </AppShell>
  );
}