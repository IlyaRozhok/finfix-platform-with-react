import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./shared/AppLayout";
import Main from "./pages/Main";
import OnboardingPage from "./pages/onboarding/Onboarding";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <Main /> }],
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
]);
