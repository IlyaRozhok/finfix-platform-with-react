import { Routes, Route, Navigate } from "react-router-dom";

import {
  RequireAuth,
  RequireGuest,
  RequireOnboarded,
} from "@/app/guards/guard";
import { useAuth } from "@/app/providers/AuthProvider";

import OnboardingLayout from "../layouts/OnboardingLayout";
import DashboardLayout from "../layouts/DashboardLayout";
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

// Component for root redirect that considers user auth status
function RootRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid h-screen place-items-center">
        <div className="animate-pulse text-sm text-neutral-500">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user.isOnboarded ? "/dashboard" : "/onboarding"} replace />;
}

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
              <DashboardLayout />
            </RequireOnboarded>
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="transactions" element={<div className="text-center py-20"><h2 className="text-2xl font-semibold text-gray-900">Transactions</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
        <Route path="debts" element={<div className="text-center py-20"><h2 className="text-2xl font-semibold text-gray-900">Debts</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
        <Route path="installments" element={<div className="text-center py-20"><h2 className="text-2xl font-semibold text-gray-900">Installments</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
        <Route path="expenses" element={<div className="text-center py-20"><h2 className="text-2xl font-semibold text-gray-900">Expenses</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
        <Route path="settings" element={<div className="text-center py-20"><h2 className="text-2xl font-semibold text-gray-900">Settings</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
      </Route>

      <Route path="/" element={<RootRedirect />} />
      {/* Don't redirect API paths */}
      <Route path="/api/*" element={null} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
