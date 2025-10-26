import { Routes, Route, Navigate } from "react-router-dom";

import {
  RequireAuth,
  RequireGuest,
  RequireOnboarded,
} from "@/app/guards/guard";

import OnboardingLayout from "../layouts/OnboardingLayout";
import { OnboardingWrapper } from "../layouts/OnboardingWrapper";
import { LoginPage } from "@/pages/login/LoginPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import {
  OnboardingCurrency,
  OnboardingIncomes,
  OnboardingExpenses,
  OnboardingDebts,
  OnboardingInstallments,
} from "@/pages/onboarding";

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
        <Route index element={<OnboardingWrapper />} />
        <Route path="currency" element={<OnboardingCurrency />} />
        <Route path="incomes" element={<OnboardingIncomes />} />
        <Route path="expenses" element={<OnboardingExpenses />} />
        <Route path="debts" element={<OnboardingDebts />} />
        <Route path="installments" element={<OnboardingInstallments />} />
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
