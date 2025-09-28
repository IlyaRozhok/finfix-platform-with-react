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
export type ExpenseRow = {
  id: string;
  category: string;
  title?: string;
  amount: string;
  frequency: "monthly" | "weekly" | "yearly";
};

export type OnboardingData = {
  baseCurrency: string;
  incomes: string;
  expenses: ExpenseRow[];
};
