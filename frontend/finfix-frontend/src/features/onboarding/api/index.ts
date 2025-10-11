import { api } from "@/shared/api/axios";
import { ReqUserCurrency, ReqUserIncomes } from "../model/types";

export const postUserCurrency = async (params: ReqUserCurrency) => {
  const { uid, currency } = params;
  try {
    const response = await api.post("api/onboarding/currencies", {
      uid,
      currency,
    });
    return response.data;
  } catch (err) {
    console.error("Failed to update currency:", err);
    throw err;
  }
};

export const postUserIncomes = async (params: ReqUserIncomes) => {
  const { uid, incomes } = params;
  try {
    const response = await api.post("api/onboarding/incomes", {
      uid,
      incomes,
    });
    return response.data;
  } catch (err) {
    console.error("Failed to update incomes:", err);
    throw err;
  }
};
