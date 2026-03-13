import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function CountingSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="counting" />
    </AppShell>
  );
}