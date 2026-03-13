import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function BucketSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="bucket" />
    </AppShell>
  );
}