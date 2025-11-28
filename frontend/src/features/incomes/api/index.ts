import { api } from "@/shared/api/axios";
import { AllIncomes } from "../model/types";

export const fetchAllIncomes = async (): Promise<AllIncomes> => {
  try {
    const response = await api.get("api/incomes/all/find");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch incomes:", err);
    throw err;
  }
};

export const createRegularIncome = async (data: { amount: number; description: string }) => {
  try {
    const response = await api.post("api/incomes/regular/create", data);
    return response.data;
  } catch (err) {
    console.error("Failed to create regular income:", err);
    throw err;
  }
};
