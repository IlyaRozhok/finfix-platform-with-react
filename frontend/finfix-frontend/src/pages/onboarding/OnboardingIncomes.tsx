import { OnboardingStep, useOnboarding } from "@/features/onboarding";
import { Input } from "@/shared/ui";
import { OnboardingFrame } from "@/widgets/onboarding";

export const OnboardingIncomes = () => {
  const { errors, data, clearIncomesError, setIncomes } = useOnboarding();

  const widgetData = {
    title: "Monthly income",
    body: `Please, indicate your monthly income in ${data.baseCurrency}`,
    step: OnboardingStep.INCOMES,
  };

  const changeIncomes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incomes = e.target.value;

    setIncomes(incomes);
    if (incomes !== "" && errors.incomes) {
      clearIncomesError();
    }
  };

  return (
    <div className="flex justify-center item-center">
      <OnboardingFrame {...widgetData}>
        <Input
          value={data.incomes}
          onChange={(e) => changeIncomes(e)}
          type="number"
          error={errors.incomes}
        />
      </OnboardingFrame>
    </div>
  );
};
