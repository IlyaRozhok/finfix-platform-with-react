import { Button } from "@/shared/ui";
import React, { ReactNode } from "react";

type OnboardingFrame = {
  title: string;
  body: string;
  children?: ReactNode;
};
export const OnboardingFrame: React.FC<OnboardingFrame> = ({
  title,
  body,
  children,
}) => {
  return (
    <div className="relative grid place-content-center w-4xl h-120 pb-30 px-10 rounded-2xl bg-black/60 backdrop-blur-[3px] text-center">
      <h2 className="text-2xl">{title}</h2>
      <h3 className="my-5 text-sm lg:text-base lg:text-white">{body}</h3>

      {children && <div>{children}</div>}

      <div className="w-full absolute bottom-3 flex justify-between px-12">
        <Button variant="ghost">Back</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
};
