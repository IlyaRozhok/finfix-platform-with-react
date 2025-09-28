import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { getOnboardingPath } from "../model/steps";
import { OnboardingStep } from "../model/types";
import { useOnboarding } from "../model/store";

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
  const { data, setIncomesError, validateExpenses } = useOnboarding();

  const handleNext = () => {
    if (step === OnboardingStep.INCOMES && !data.incomes) {
      return setIncomesError("Please, enter amount of your incomes");
    }
    if (step === OnboardingStep.EXPENSES) {
      const ok = validateExpenses();
      if (!ok) return;
    }
    console.log("data", data);
    navigate(getOnboardingPath({ step, type: "next" }));
  };

  return (
    <Button variant="primary" onClick={handleNext}>
      Next
    </Button>
  );
};
