import { OnboardingFrame } from "@/widgets/onboarding";
import React from "react";

export const OnboardingCurrency = () => {
  const widgetData = {
    title: "Base currency",
    body: `Select prefered currency for using in app`,
  };

  return (
    <div className="flex justify-center item-center">
      <OnboardingFrame {...widgetData}>Hello)</OnboardingFrame>
    </div>
  );
};
