import React from "react";

interface OverviewWidgetProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: "blue" | "green" | "red" | "yellow";
}

export function OverviewWidget({ title, value, icon }: OverviewWidgetProps) {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="text-2xl font-bold mt-1 text-white">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        <div className="text-2xl text-white/70">{icon}</div>
      </div>
    </div>
  );
}

