import { Debt } from "@/entities/debts/model";
import { Expense } from "@/entities/expenses/model";

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
  expenses: Expense[];
  debts: Debt[];
};

export type ReqUserCurrency = {
  uid: string;
  currency: string;
};
