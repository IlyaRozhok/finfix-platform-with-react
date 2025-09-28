import {
  OnboardingNextButton,
  OnboardingBackButton,
  OnboardingStep,
} from "@/features/onboarding";
import React, { ReactNode } from "react";

type OnboardingFrame = {
  title: string;
  body: string;
  children?: ReactNode;
  step: OnboardingStep;
};
export const OnboardingFrame: React.FC<OnboardingFrame> = ({
  title,
  body,
  children,
  step,
}) => {
  return (
    <div className="relative grid place-content-center w-4xl h-120 pb-30 px-10 rounded-2xl bg-black/60 backdrop-blur-[3px] text-center">
      <h2 className="text-2xl">{title}</h2>
      <h3 className="mb-1 mt-4 text-sm lg:text-base lg:text-white">{body}</h3>
      {children && <div>{children}</div>}
      <div className="w-full absolute bottom-3 flex justify-between px-12">
        <OnboardingBackButton step={step} />
        <OnboardingNextButton step={step} />
      </div>
    </div>
  );
};
