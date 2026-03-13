import { AppShell } from "@/components/layout/AppShell";
import { NQueensVisualizer } from "@/components/nqueens/NQueensVisualizer";

export default function NQueensPage() {
  return (
    <AppShell>
      <NQueensVisualizer algorithm="nqueens" />
    </AppShell>
  );
}