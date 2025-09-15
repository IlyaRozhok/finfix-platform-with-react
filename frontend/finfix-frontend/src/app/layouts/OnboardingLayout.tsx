import { OnboardingHeader } from "@/widgets/header";
import { Outlet } from "react-router-dom";

const OnboardingLayout: React.FC = () => {
  return (
    <div className="bg-deep-blue h-full">
      <OnboardingHeader />
      <Outlet />
    </div>
  );
};

export default OnboardingLayout;
