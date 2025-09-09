
import { CurrencyStep } from "../../components/onboardingSteps/CurrencyStep";
import { DebtsStep } from "../../components/onboardingSteps/DebtsStep";
import { ExpensesStep } from "../../components/onboardingSteps/ExpensesStep";
import { IncomesStep } from "../../components/onboardingSteps/IncomesStep";
import { WelcomeStep } from "../../components/onboardingSteps/WelcomeStep";
import { OnboardingSummary } from "../../components/onboardingSteps/OnboardingSummary";
import { useOnboardingStore } from "../../store/onboarding";

import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";

const STEP_COMPONENTS = {
  0: WelcomeStep,
  1: CurrencyStep,
  2: IncomesStep,
  3: ExpensesStep,
  4: DebtsStep,
};

export function OnboardingWizard() {
  const { currentStep, totalSteps, isCompleted, resetOnboarding } =
    useOnboardingStore();

  console.log(
    "OnboardingWizard render - currentStep:",
    currentStep,
    "totalSteps:",
    totalSteps
  );

  const StepComponent =
    STEP_COMPONENTS[currentStep as keyof typeof STEP_COMPONENTS];

  console.log("StepComponent:", StepComponent?.name || "undefined");

  // Progress calculation: exclude welcome step (step 0) from progress
  const progressStep = Math.max(0, currentStep - 1);
  const progressTotal = totalSteps - 1; // Exclude welcome step from total
  const progressValue =
    progressTotal > 0 ? (progressStep / progressTotal) * 100 : 0;

  // Show completion state
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <OnboardingSummary />
      </div>
    );
  }

  if (!StepComponent) {
    console.error("No step component found for step:", currentStep);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 shadow-lg border-0 bg-card text-center">
          <p className="text-destructive">
            Error: Step {currentStep} not found
          </p>
          <Button onClick={() => resetOnboarding()} className="mt-4">
            Reset Onboarding
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Progress Bar - Only show after welcome step */}
        {currentStep > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Step {progressStep} of {progressTotal}
              </span>
              <span>{Math.round(progressValue)}% complete</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        )}

        {/* Step Content */}
        <Card className="p-8 shadow-lg border-0 bg-card">
          <StepComponent />
        </Card>
      </div>
    </div>
  );
}
