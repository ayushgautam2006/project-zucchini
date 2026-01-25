import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
