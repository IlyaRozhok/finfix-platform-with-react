// src/pages/onboarding/OnboardingExpenses.tsx
import {
  OnboardingStep,
  ExpenseRow as Row,
} from "@/features/onboarding/model/types";
import { useOnboarding } from "@/features/onboarding/model/store";
import { OnboardingFrame } from "@/widgets/onboarding";
import { ExpenseRow } from "@/features/onboarding/ui/ExpenseRow";
import { Button } from "@/shared/ui";
import { useMemo } from "react";

export const OnboardingExpenses = () => {
  const { data, addExpense } = useOnboarding();

  const widgetData = {
    title: "Monthly expenses",
    body: `Add your typical expenses in ${
      data.baseCurrency || "…"
    }. You can edit later.`,
    step: OnboardingStep.EXPENSES,
  };

  const monthlyTotal = useMemo(() => {
    const toMonthly = (r: Row) => {
      const n = Number(r.amount);
      if (!Number.isFinite(n)) return 0;
      if (r.frequency === "monthly") return n;
      if (r.frequency === "weekly") return n * 4.33;
      return n / 12;
    };
    return data.expenses.reduce((acc, r) => acc + toMonthly(r), 0);
  }, [data.expenses]);

  return (
    <div className="flex justify-center item-center">
      <OnboardingFrame {...widgetData}>
        <div className="mt-2 space-y-3">
          {/* внутренний скролл, не перекрывается футером */}
          <div className="custom-scroll max-h-[45vh] md:max-h-72 overflow-y-auto space-y-3 px-5">
            {data.expenses.map((r) => (
              <ExpenseRow key={r.id} row={r} />
            ))}
          </div>

          {/* нижняя панель: колонкой на мобиле, строкой на md+ */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1 items-center mb-3">
            <Button
              variant="ghost"
              onClick={addExpense}
              className="w-full sm:w-auto"
            >
              + Add expense
            </Button>
            <div className="text-sm text-slate-300 text-right">
              Est. monthly total:
              <span className="ml-2 font-semibold">
                {monthlyTotal.toFixed(2)} {data.baseCurrency}
              </span>
            </div>
          </div>
        </div>
      </OnboardingFrame>
    </div>
  );
};
