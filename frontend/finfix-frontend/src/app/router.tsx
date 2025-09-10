import { LoginPage } from "@/pages/login/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";

// import { OnboardingPage } from "@/pages/onboarding/OnboardingPage";
// import { DashboardPage } from "@/pages/dashboard/DashboardPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* <Route
        path="/onboarding"
        element={
          <RequireAuth>
            <RequireNotOnboarded>
              <OnboardingPage />
            </RequireNotOnboarded>
          </RequireAuth>
        }
      /> */}

      {/* <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <RequireOnboarded>
              <DashboardPage />
            </RequireOnboarded>
          </RequireAuth>
        }
      /> */}

      {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
