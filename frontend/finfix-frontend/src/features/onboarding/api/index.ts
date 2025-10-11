import { api } from "@/shared/api/axios";
import {
  ReqUserCurrency,
  ReqUserExpense,
  ReqUserIncomes,
} from "../model/types";

export const createUserOnboardingCurrency = async (
  payload: ReqUserCurrency
) => {
  const { uid, currency } = payload;
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

export const createUserOnboardingIncomes = async (payload: ReqUserIncomes) => {
  const { uid, incomes } = payload;
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

export const createUserIncomes = async (payload: ReqUserExpense[]) => {
  try {
    const response = await api.post("api/onboarding/expenses", payload);
    return response.data;
  } catch (err) {
    console.error("Failed to update expenses:", err);
    throw err;
  }
};
