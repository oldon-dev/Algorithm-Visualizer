import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function GnomeSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="gnome" />
    </AppShell>
  );
}