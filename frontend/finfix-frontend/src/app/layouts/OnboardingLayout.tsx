import { OnboardingHeader } from "@/widgets/header";
import { Outlet } from "react-router-dom";

const OnboardingLayout: React.FC = () => {
  return (
    <div className="text-white md:bg-top h-full bg-[url(src/assets/bank-card.jpg)] bg-position-[top_left_100px] bg-cover bg-no-repeat">
      <OnboardingHeader />
      <div className="p-[5%]">
        <Outlet />
      </div>
    </div>
  );
};

export default OnboardingLayout;
