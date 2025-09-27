import { useAuth } from "@/app/providers/AuthProvider";
import { extractUserName } from "@/shared/lib/extractUserName";
import { OnboardingFrame } from "@/widgets/onboarding";

export const OnboardingWelcome = () => {
  const { user } = useAuth();

  const widgetData = {
    title: `Welcome, ${extractUserName(user?.userName)}!`,
    body: "Let's set up your profile. It will take a few minutes. You can update your information later.",
  };

  return (
    <div className="flex justify-center item-center">
      <OnboardingFrame {...widgetData} />
    </div>
  );
};
