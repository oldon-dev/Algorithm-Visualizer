import { AppShell } from "@/components/layout/AppShell";
import { SudokuVisualizer } from "@/components/sudoku/SudokuVisualizer";

export default function SudokuPage() {
  return (
    <AppShell>
      <SudokuVisualizer algorithm="sudoku" />
    </AppShell>
  );
}