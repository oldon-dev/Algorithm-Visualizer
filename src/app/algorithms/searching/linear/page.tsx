import { AppShell } from "@/components/layout/AppShell";
import { SearchingVisualizer } from "@/components/searching/SearchingVisualizer";

export default function LinearSearchPage() {
  return (
    <AppShell>
      <SearchingVisualizer algorithm="linear" />
    </AppShell>
  );
}