import React from "react";
import { clsx } from "clsx";

interface OverviewWidgetProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: "blue" | "green" | "red" | "yellow";
}

export function OverviewWidget({ title, value, icon, color = "blue" }: OverviewWidgetProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <div className={clsx("p-6 bg-white rounded-lg border shadow-sm", colorClasses[color])}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
}

