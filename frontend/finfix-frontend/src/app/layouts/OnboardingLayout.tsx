import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";

const OnboardingLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default OnboardingLayout;
