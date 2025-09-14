import { Routes, Route, Navigate } from "react-router-dom";

import {
  RequireAuth,
  RequireGuest,
  RequireOnboarded,
} from "@/shared/lib/guard";

import OnboardingLayout from "./layouts/OnboardingLayout";
import { LoginPage } from "@/pages/login/LoginPage";
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
              <OnboardingLayout />
            </RequireOnboarded>
          </RequireAuth>
        }
      >
        <Route index element={<OnboardingPage />} />
      </Route>

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
