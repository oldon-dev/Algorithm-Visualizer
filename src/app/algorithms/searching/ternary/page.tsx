import { AppShell } from "@/components/layout/AppShell";
import { SearchingVisualizer } from "@/components/searching/SearchingVisualizer";

export default function TernarySearchPage() {
  return (
    <AppShell>
      <SearchingVisualizer algorithm="ternary" />
    </AppShell>
  );
}