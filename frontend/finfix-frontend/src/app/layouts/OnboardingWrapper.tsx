import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import { fetchSummary } from "@/features/onboarding/api";
import OnboardingLayout from "./OnboardingLayout";

interface OnboardingSummary {
  currency: string | null;
  incomes: number | null;
  isOnboarded: boolean;
  expenses: unknown[];
}

export const OnboardingWrapper: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const loadOnboardingSummary = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const summaryData = await fetchSummary(user.id);
      const nextStep = determineNextStep(summaryData);
      navigate(`/onboarding${nextStep}`, { replace: true });
    } catch (error) {
      console.error("Failed to load onboarding summary:", error);
      navigate("/onboarding", { replace: true });
    } finally {
      setLoading(false);
    }
  };
  
  const determineNextStep = useCallback(
    (summary: OnboardingSummary): string => {
      if (summary.isOnboarded) {
        navigate("/dashboard", { replace: true });
        return "";
      }

      if (!summary.currency) {
        return "/currency";
      }

      if (!summary.incomes) {
        return "/incomes";
      }

      if (!summary.expenses || summary.expenses.length === 0) {
        return "/expenses";
      }

      return "/debts";
    },
    [navigate]
  );

  useEffect(() => {
    loadOnboardingSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="text-lg">Loading onboarding...</div>
      </div>
    );
  }

  return <OnboardingLayout />;
};
