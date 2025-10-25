import { api } from "@/shared/api/axios";
import {
  ReqUserCurrency,
  ReqCreateUserExpense,
  ReqUserIncomes,
  ReqCreateDebt,
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

export const createUserExpenses = async (payload: ReqCreateUserExpense[]) => {
  try {
    const response = await api.post("api/onboarding/expenses", payload);
    return response.data;
  } catch (err) {
    console.error("Failed to update expenses:", err);
    throw err;
  }
};

export const deleteExpense = async (id: string) => {
  try {
    const expense = await api.delete(`/api/onboarding/expenses/${id}`);
    alert("Expense sucessfully deleted");
    return expense.data;
  } catch (err) {
    console.error("Failed to update expenses:", err);
    throw err;
  }
};

export const fetchCategories = async (): Promise<
  { id: string; name: string; userId: string | null }[]
> => {
  try {
    const categories = await api.get("api/onboarding/categories");
    return categories.data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    throw err;
  }
};

export const fetchSummary = async (id: string) => {
  try {
    const summary = await api.get(`api/onboarding/summary?uid=${id}`);
    return summary.data;
  } catch (err) {
    console.error("Failed to fetch onboarding summary:", err);
    throw err;
  }
};

export const fetchDebts = async (uid: string): Promise<ReqCreateDebt[]> => {
  try {
    const response = await api.get(`api/onboarding/debts/${uid}`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch debts:", err);
    throw err;
  }
};

export const createDebts = async (payload: ReqCreateDebt[], uid: string) => {
  try {
    const response = await api.post(`api/onboarding/debts?uid=${uid}`, payload);
    return response.data;
  } catch (err) {
    console.error("Failed to update debts:", err);
    throw err;
  }
};

export const updateDebt = async (id: string, payload: ReqCreateDebt) => {
  try {
    const response = await api.put(`/api/onboarding/debts/${id}`, payload);
    return response.data;
  } catch (err) {
    console.error("Failed to update debt:", err);
    throw err;
  }
};

export const deleteDebt = async (id: string) => {
  try {
    const debt = await api.delete(`/api/onboarding/debts/${id}`);
    alert("Debt sucessfully deleted");
    return debt.data;
  } catch (err) {
    console.error("Failed to update debt:", err);
    throw err;
  }
};
