import { api } from "@/shared/api/axios";
import { Expense } from "../model/types";

export const fetchUserExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await api.get("api/expenses");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch user expenses:", err);
    throw err;
  }
};
