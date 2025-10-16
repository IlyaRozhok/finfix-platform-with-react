import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import { fetchSummary } from "@/features/onboarding/api";
import { OnboardingWelcome } from "@/pages/onboarding";

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

  const determineNextStep = useCallback(
    (summary: OnboardingSummary): string => {
      if (summary.isOnboarded) {
        navigate("/dashboard", { replace: true });
        return "";
      }

      if (!summary.incomes) {
        return "/";
      }

      if (!summary.currency) {
        return "/currency";
      }

      if (!summary.expenses || summary.expenses.length === 0) {
        return "/expenses";
      }

      return "/debts";
    },
    [navigate]
  );

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
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOnboardingSummary();
  }, [user?.id, navigate, determineNextStep]);

  if (loading) {
    return <OnboardingWelcome />;
  }

  return <OnboardingWelcome />;
};
