// src/pages/onboarding/OnboardingExpenses.tsx
import { OnboardingStep, ExpenseRow as Row } from "@/features/onboarding/model/types";
import { useOnboarding } from "@/features/onboarding/model/store";
import { OnboardingFrame } from "@/widgets/onboarding";
import { ExpenseRow } from "@/features/onboarding/ui/ExpenseRow";
import { Button } from "@/shared/ui";
import { useMemo } from "react";

export const OnboardingExpenses = () => {
  const { data, addExpense, validateExpenses } = useOnboarding();

  const widgetData = {
    title: "Monthly expenses",
    body: `Add your typical expenses in ${data.baseCurrency}. You can edit later.`,
    step: OnboardingStep.EXPENSES,
  };

  const monthlyTotal = useMemo(() => {
    // для weekly/yearly приведём к месяцу грубо: *4.33 и /12
    const toMonthly = (r: Row) => {
      const n = Number(r.amount);
      if (!Number.isFinite(n)) return 0;
      if (r.frequency === "monthly") return n;
      if (r.frequency === "weekly") return n * 4.33;
      return n / 12; // yearly
    };
    return data.expenses.reduce((acc, r) => acc + toMonthly(r), 0);
  }, [data.expenses]);

  return (
    <div className="flex justify-center item-center">
      <OnboardingFrame {...widgetData}>
        <div className="mt-4 space-y-3">
          {data.expenses.map((r) => (
            <ExpenseRow key={r.id} row={r} />
          ))}

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" onClick={addExpense}>+ Add expense</Button>
            <div className="text-sm text-slate-300">
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