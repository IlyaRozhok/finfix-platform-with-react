import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/login/LoginPage";
import { RequireAuth, RequireGuest, RequireOnboarded } from "@/shared/lib/guard";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";

const OnboardingPage = () => <div className="p-6">Onboarding (stub)</div>;

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RequireGuest>
            <LoginPage />
          </RequireGuest>
        }
      />

      <Route
        path="/onboarding"
        element={
          <RequireAuth>
            <RequireOnboarded invert>
              <OnboardingPage />
            </RequireOnboarded>
          </RequireAuth>
        }
      />

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <RequireOnboarded>
              <DashboardPage />
            </RequireOnboarded>
          </RequireAuth>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}