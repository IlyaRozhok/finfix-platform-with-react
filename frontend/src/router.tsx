import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./shared/AppLayout";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import OnboardingTest from "./pages/OnboardingTest";
import OnboardingMinimal from "./pages/OnboardingMinimal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "onboarding", element: <Onboarding /> },
      { path: "onboarding-test", element: <OnboardingTest /> },
    ],
  },
  {
    path: "/onboarding-standalone",
    element: <Onboarding />,
  },
  {
    path: "/onboarding-minimal",
    element: <OnboardingMinimal />,
  },
]);
