import { AppShell } from "@/components/layout/AppShell";
import { SearchingVisualizer } from "@/components/searching/SearchingVisualizer";

export default function BinarySearchPage() {
  return (
    <AppShell>
      <SearchingVisualizer algorithm="binary" />
    </AppShell>
  );
}