import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { getOnboardingPath } from "../model/steps";
import {
  OnboardingStep,
  ReqUserExpense,
  ReqCreateUserExpense,
} from "../model/types";
import { useOnboarding } from "../model/store";
import { createUserExpenses, createUserOnboardingIncomes } from "../api";
import { useAuth } from "@/app/providers/AuthProvider";

const prepareExpensesForApi = (
  expenses: ReqUserExpense[]
): ReqCreateUserExpense[] => {
  return expenses.map((expense) => {
    // Include the ID if it exists (for updates) or omit it (for new records)
    const { id, ...rest } = expense;
    return {
      ...rest,
      ...(id && { id }), // Only include id if it exists
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

      // Only send request if expenses have changed
      if (hasExpensesChanged() && user?.id) {
        console.log("u", user);
        console.log("d", data);
        const cleanedExpenses = prepareExpensesForApi(data.expenses);
        createUserExpenses(cleanedExpenses);
      } else {
        console.log("Expenses unchanged, skipping API call");
      }
    }

    if (step === OnboardingStep.BANK_DEBT) {
      const ok = validateDebts();
      if (!ok) return;
    }
    navigate(getOnboardingPath({ step, type: "next" }));
  };

  return (
    <Button variant="primary" onClick={handleNext}>
      Next
    </Button>
  );
};
