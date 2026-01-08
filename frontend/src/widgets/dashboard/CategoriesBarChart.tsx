import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Expense, ExpenseTransaction } from "@/features/dashboard/model/types";

interface CategoriesBarChartProps {
  expenses: Expense[];
  expenseTransactions?: ExpenseTransaction[];
}

// Subtle, muted colors for minimalist glassmorphism design
const COLORS = [
  "rgba(148, 163, 184, 0.5)",
  "rgba(156, 163, 175, 0.45)",
  "rgba(203, 213, 225, 0.4)",
  "rgba(226, 232, 240, 0.35)",
  "rgba(241, 245, 249, 0.4)",
  "rgba(148, 163, 184, 0.45)",
  "rgba(156, 163, 175, 0.4)",
  "rgba(203, 213, 225, 0.35)",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2 shadow-lg">
        <p className="text-sm text-primary-background/90 font-medium">
          {payload[0].payload.name}
        </p>
        <p className="text-xs text-primary-background/70">
          ${payload[0].value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    );
  }
  return null;
};

export function CategoriesBarChart({
  expenses,
  expenseTransactions,
}: CategoriesBarChartProps) {
  const data = useMemo(() => {
    const totals: Record<string, number> = {};

    // First, use expenseTransactions if available
    if (expenseTransactions && expenseTransactions.length > 0) {
      expenseTransactions.forEach((transaction) => {
        // Only process expense transactions
        if (transaction.direction !== "expense") {
          return;
        }

        const amount = Math.abs(parseFloat(transaction.amount || "0"));
        if (amount <= 0 || isNaN(amount)) {
          return;
        }

        // Determine category name
        let categoryName = "Uncategorized";

        // Priority 1: Use category name if available
        if (transaction.category?.name && transaction.category.name.trim()) {
          categoryName = transaction.category.name.trim();
        } 
        // Priority 2: Use note (first few words) if no category
        else if (transaction.note && transaction.note.trim()) {
          const noteWords = transaction.note.trim().split(/\s+/);
          if (noteWords.length > 0) {
            // Use first 2-3 words as category name
            categoryName = noteWords.slice(0, Math.min(3, noteWords.length)).join(" ");
            if (categoryName.length > 25) {
              categoryName = categoryName.substring(0, 25) + "...";
            }
          }
        }
        // Priority 3: Use formatted type name
        else if (transaction.type) {
          categoryName = transaction.type
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
        }

        totals[categoryName] = (totals[categoryName] || 0) + amount;
      });
    }

    // Only fall back to expenses if no expenseTransactions data
    if (Object.keys(totals).length === 0 && expenses && expenses.length > 0) {
      expenses.forEach((expense) => {
        if (expense.category) {
          const amount = parseFloat(expense.amount || "0");
          if (amount > 0 && !isNaN(amount)) {
            const categoryName = expense.category.name || "Uncategorized";
            totals[categoryName] = (totals[categoryName] || 0) + amount;
          }
        }
      });
    }

    // Convert to array, sort, and format
    const sortedData = Object.entries(totals)
      .filter(([, total]) => total > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([categoryName, total], index) => ({
        name:
          categoryName.length > 18
            ? categoryName.substring(0, 18) + "..."
            : categoryName,
        value: Number(total.toFixed(2)),
        color: COLORS[index % COLORS.length],
      }));

    return sortedData;
  }, [expenses, expenseTransactions]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 sm:h-64 lg:h-80 text-primary-background/50">
        <div className="text-center px-4">
          <div className="text-xs sm:text-sm mb-2">No expense data available</div>
          <div className="text-xs text-primary-background/40">
            {expenseTransactions && expenseTransactions.length > 0
              ? "No expense transactions found"
              : "Add transactions to see the chart"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-48 sm:h-64 lg:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
        >
          <XAxis
            type="number"
            tick={{ fill: "rgba(0, 0, 0, 0.5)", fontSize: 10 }}
            axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            tickFormatter={(value) => {
              if (value >= 1000) {
                return `$${(value / 1000).toFixed(1)}k`;
              }
              return `$${value}`;
            }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "rgba(0, 0, 0, 0.6)", fontSize: 10 }}
            axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            width={100}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            radius={[0, 6, 6, 0]}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

