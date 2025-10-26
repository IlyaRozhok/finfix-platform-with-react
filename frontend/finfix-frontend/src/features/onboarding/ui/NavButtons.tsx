import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { getOnboardingPath } from "../model/steps";
import {
  OnboardingStep,
  ReqCreateDebt,
  ReqCreateUserExpense,
  ReqUserExpense,
} from "../model/types";
import { Debt } from "@entities/debts/model";
import { useOnboarding } from "../model/store";
import {
  createDebts,
  createUserExpenses,
  createUserOnboardingIncomes,
  updateDebt,
} from "../api";
import { useAuth } from "@/app/providers/AuthProvider";

const prepareExpensesForApi = (
  expenses: ReqUserExpense[]
): ReqCreateUserExpense[] => {
  return expenses.map((expense) => {
    const { id, ...rest } = expense;
    return {
      ...rest,
      ...(id && { id }),
    };
  });
};

const prepareNewDebtsForApi = (
  debts: Debt[],
  userId: string
): ReqCreateDebt[] => {
  return debts
    .filter((debt) => !debt.id || debt.id.startsWith("temp-")) // Only include new debts
    .map((debt) => {
      const { id, ...rest } = debt;
      return {
        ...rest,
        userId: userId,
      };
    });
};

interface OnboardingNextButtonProps {
  step: OnboardingStep;
}

export const OnboardingBackButton: React.FC<OnboardingNextButtonProps> = ({
  step,
}) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      onClick={() => navigate(getOnboardingPath({ step, type: "back" }))}
    >
      Back
    </Button>
  );
};

export const OnboardingNextButton: React.FC<OnboardingNextButtonProps> = ({
  step,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    data,
    setIncomesError,
    validateExpenses,
    validateDebts,
    hasExpensesChanged,
    hasDebtsChanged,
  } = useOnboarding();
  const handleNext = () => {
    if (step === OnboardingStep.INCOMES) {
      if (!data.incomes) {
        return setIncomesError("Please, enter amount of your incomes");
      }
      if (user?.id) {
        createUserOnboardingIncomes({
          uid: user.id as string,
          incomes: data.incomes,
        });
      }
    }
    if (step === OnboardingStep.EXPENSES) {
      const ok = validateExpenses();
      if (!ok) return;

      if (hasExpensesChanged() && user?.id) {
        const expensesPayload = prepareExpensesForApi(data.expenses);
        createUserExpenses(expensesPayload);
      }
    }

    if (step === OnboardingStep.BANK_DEBT) {
      const ok = validateDebts();
      if (!ok) return;

      if (hasDebtsChanged() && user?.id) {
        const newDebtsPayload = prepareNewDebtsForApi(data.debts, user.id);
        if (newDebtsPayload.length > 0) {
          createDebts(newDebtsPayload, user.id);
        }

        const existingDebts = data.debts.filter(
          (debt) => debt.id && !debt.id.startsWith("temp-")
        );
        for (const debt of existingDebts) {
          const debtPayload = {
            userId: user.id,
            totalDebt: debt.totalDebt,
            interest: debt.interest,
            description: debt.description || "",
          };
          updateDebt(debt.id!, debtPayload);
        }
      }
    }
    navigate(getOnboardingPath({ step, type: "next" }));
  };

  return (
    <Button variant="primary" onClick={handleNext}>
      Next
    </Button>
  );
};
