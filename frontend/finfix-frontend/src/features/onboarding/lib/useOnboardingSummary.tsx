import { useEffect, useState } from "react";
import { fetchSummary } from "../api";
import { useAuth } from "@/app/providers/AuthProvider";
import { ReqUserExpense } from "../model/types";

interface ISummary {
  isOnboarded: boolean;
  incomes: string;
  expenses: ReqUserExpense[];
}
export default function useOnboardingSummary() {
  const [summary, setSummary] = useState<ISummary>();
  const { user } = useAuth();

  const getSummary = async (id: string) => {
    const summary = await fetchSummary(id);
    setSummary(summary);
  };

  useEffect(() => {
    if (user?.id) {
      getSummary(user?.id);
    } else {
      throw new Error("User id did not provided");
    }
  }, []);

  return { ...summary };
}
