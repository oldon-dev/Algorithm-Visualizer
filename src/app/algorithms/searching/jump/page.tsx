import { AppShell } from "@/components/layout/AppShell";
import { SearchingVisualizer } from "@/components/searching/SearchingVisualizer";

export default function JumpSearchPage() {
  return (
    <AppShell>
      <SearchingVisualizer algorithm="jump" />
    </AppShell>
  );
}