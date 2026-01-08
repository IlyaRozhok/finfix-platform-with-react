import React from "react";

interface OverviewWidgetProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: "blue" | "green" | "red" | "yellow";
}

export function OverviewWidget({ title, value, icon }: OverviewWidgetProps) {
  return (
    <div className="p-4 sm:p-5 lg:p-6 bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-primary-background/70 truncate">{title}</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold mt-1 text-primary-background/90">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        <div className="text-xl sm:text-2xl text-primary-background/50 flex-shrink-0 ml-2">{icon}</div>
      </div>
    </div>
  );
}

