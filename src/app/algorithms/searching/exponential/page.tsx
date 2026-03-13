import { AppShell } from "@/components/layout/AppShell";
import { SearchingVisualizer } from "@/components/searching/SearchingVisualizer";

export default function ExponentialSearchPage() {
  return (
    <AppShell>
      <SearchingVisualizer algorithm="exponential" />
    </AppShell>
  );
}