import { Expense } from "@/entities/expenses/model";

export enum OnboardingStep {
  WELCOME = "Welcome",
  CURRENCY = "Currency",
  INCOMES = "Incomes",
  EXPENSES = "Expenses",
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
};
