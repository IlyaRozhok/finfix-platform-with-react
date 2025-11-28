import { api } from "@/shared/api/axios";
import { Debt } from "@/entities/debts/model";

export const fetchUserDebts = async (): Promise<Debt[]> => {
  try {
    const response = await api.get("api/onboarding/debts");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch user debts:", err);
    throw err;
  }
};
