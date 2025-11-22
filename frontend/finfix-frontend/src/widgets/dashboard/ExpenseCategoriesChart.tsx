import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Expense } from "@/features/dashboard/model/types";

interface ExpenseCategoriesChartProps {
  expenses: Expense[];
}

const COLORS = [
  "#3B82F6", // blue
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // violet
  "#06B6D4", // cyan
  "#84CC16", // lime
  "#F97316", // orange
];

export function ExpenseCategoriesChart({
  expenses,
}: ExpenseCategoriesChartProps) {
  // Group expenses by category name and sum amounts
  const categoryTotals = expenses.reduce((acc, expense) => {
    const amount = parseFloat(expense.amount);
    const categoryName = expense.category.name;
    acc[categoryName] = (acc[categoryName] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  console.log(categoryTotals);
  const data = Object.entries(categoryTotals).map(
    ([categoryName, total], index) => ({
      name: categoryName,
      value: total,
      color: COLORS[index % COLORS.length],
    })
  );

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-primary-background mb-4">
        Top Expense Categories
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [value.toLocaleString(), "Amount"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
