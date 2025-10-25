import { Debt } from "@/entities/debts/model";

export enum OnboardingStep {
  WELCOME = "Welcome",
  CURRENCY = "Currency",
  INCOMES = "Incomes",
  EXPENSES = "Expenses",
  BANK_DEBT = "debts",
}

export type OnboardingStepsCfg = {
  id: OnboardingStep;
  path: string;
  title: string;
};

export type OnboardingData = {
  baseCurrency: string;
  incomes: string;
  expenses: ReqUserExpense[];
  debts: Debt[];
};

export type ReqUserCurrency = {
  uid: string;
  currency: string;
};

export type ReqUserIncomes = {
  uid: string;
  incomes: string;
};

export type ReqUserExpense = {
  id: string;
  userId: string;
  categoryId: string;
  amount: string;
  description: string;
};

export type ReqCreateUserExpense = {
  id?: string;
  userId: string;
  categoryId: string;
  amount: number | string;
  description?: string;
};

export type ReqCreateDebt = {
  id?: string;
  totalDebt: string;
  interest: string;
  description?: string;
};
