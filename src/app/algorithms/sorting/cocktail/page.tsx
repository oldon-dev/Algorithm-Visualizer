import { AppShell } from "@/components/layout/AppShell";
import { SortingVisualizer } from "@/components/sorting/SortingVisualizer";

export default function CocktailShakerSortPage() {
  return (
    <AppShell>
      <SortingVisualizer algorithm="cocktail" />
    </AppShell>
  );
}