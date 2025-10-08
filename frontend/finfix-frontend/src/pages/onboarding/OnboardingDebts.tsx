import { OnboardingStep } from "@/features/onboarding/model/types";
import { useOnboarding } from "@/features/onboarding/model/store";
import { OnboardingFrame } from "@/widgets/onboarding";

import { Button } from "@/shared/ui";
import { useMemo } from "react";
import { BankDebtRow } from "@/features/onboarding";

export const OnboardingDebts = () => {
  const { data, addDebt } = useOnboarding();

  const widgetData = {
    title: "Bank debts",
    body: `Add active loans in ${
      data.baseCurrency || "…"
    } (if any). You can skip this step.`,
    step: OnboardingStep.BANK_DEBT,
  };

  const monthlyTotal = useMemo(() => {
    return data.debts.reduce(
      (sum, d) => sum + (Number(d.monthlyPayment) || 0),
      0
    );
  }, [data.debts]);

  return (
    <div className="flex justify-center item-center">
      <OnboardingFrame {...widgetData}>
        <div className="mt-4 space-y-3">
          <div className="custom-scroll max-h-[50vh] md:max-h-72 overflow-y-auto pr-2 pb-4 space-y-3">
            {data.debts.map((r) => (
              <BankDebtRow key={r.id} row={r} />
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-1">
            <Button
              variant="ghost"
              onClick={addDebt}
              className="w-full sm:w-auto"
            >
              + Add debt
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
