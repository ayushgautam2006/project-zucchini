import { LayoutGrid, Table } from "lucide-react";

interface ViewToggleProps {
  view: "cards" | "table";
  onViewChange: (view: "cards" | "table") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
      <button
        onClick={() => onViewChange("cards")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          view === "cards" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
        Cards
      </button>
      <button
        onClick={() => onViewChange("table")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          view === "table" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <Table className="h-4 w-4" />
        Table
      </button>
    </div>
  );
}
