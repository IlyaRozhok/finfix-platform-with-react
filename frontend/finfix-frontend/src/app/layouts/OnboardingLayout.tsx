import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";

const OnboardingLayout: React.FC = () => {
  return (
    <div className="bg-violet-100 h-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default OnboardingLayout;
