import React from "react";

export type FilterTab = "all" | "nitr" | "non-nitr";

interface FilterTabsProps {
  currentTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
}

export function FilterTabs({ currentTab, onTabChange }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
      <button
        onClick={() => onTabChange("all")}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
          currentTab === "all" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        All
      </button>
      <button
        onClick={() => onTabChange("nitr")}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
          currentTab === "nitr"
            ? "bg-purple-500/20 text-purple-400"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        NITR
      </button>
      <button
        onClick={() => onTabChange("non-nitr")}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
          currentTab === "non-nitr"
            ? "bg-orange-500/20 text-orange-400"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        Non-NITR
      </button>
    </div>
  );
}
