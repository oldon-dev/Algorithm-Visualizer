import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function ShellSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="shell" />
    </AppShell>
  );
}