import { create } from "zustand";
import { ExpenseRow, OnboardingData } from "./types";

const PRESET_CATEGORIES = [
  "Rent",
  "Utilities",
  "Groceries",
  "Transport",
  "Subscriptions",
  "Entertainment",
  "Health",
  "Other",
];

const mkRow = (): ExpenseRow => ({
  id: crypto.randomUUID(),
  category: "Other",
  title: "",
  amount: "",
  frequency: "monthly",
});

type OnboardingState = {
  data: OnboardingData;
  errors: {
    incomes: string;
    expenses?: Record<string, string>; // по id строки
  };
  setCurrency: (currencyId: string) => void;
  setIncomes: (amount: string) => void;
  setIncomesError: (message: string) => void;
  clearIncomesError: () => void;
  addExpense: () => void;
  removeExpense: (id: string) => void;
  updateExpense: <K extends keyof ExpenseRow>(
    id: string,
    key: K,
    value: ExpenseRow[K]
  ) => void;
  validateExpenses: () => boolean;
  clearExpenseError: (id: string) => void;
};

export const useOnboarding = create<OnboardingState>((set, get) => ({
  data: {
    baseCurrency: "UAH",
    incomes: "",
    expenses: [mkRow()],
  },
  errors: { incomes: "", expenses: {} },

  setCurrency: (currencyId) =>
    set((s) => ({ data: { ...s.data, baseCurrency: currencyId } })),
  setIncomes: (amount) =>
    set((s) => ({ data: { ...s.data, incomes: amount } })),
  setIncomesError: (message) =>
    set((s) => ({ errors: { ...s.errors, incomes: message } })),
  clearIncomesError: () =>
    set((s) => ({ errors: { ...s.errors, incomes: "" } })),

  addExpense: () =>
    set((s) => ({
      data: { ...s.data, expenses: [...s.data.expenses, mkRow()] },
    })),

  removeExpense: (id) =>
    set((s) => ({
      data: { ...s.data, expenses: s.data.expenses.filter((e) => e.id !== id) },
      errors: {
        ...s.errors,
        expenses: Object.fromEntries(
          Object.entries(s.errors.expenses ?? {}).filter(([k]) => k !== id)
        ),
      },
    })),

  updateExpense: (id, key, value) =>
    set((s) => ({
      data: {
        ...s.data,
        expenses: s.data.expenses.map((e) =>
          e.id === id ? { ...e, [key]: value } : e
        ),
      },
    })),

  validateExpenses: () => {
    const { expenses } = get().data;
    const errs: Record<string, string> = {};
    expenses.forEach((e) => {
      if (!e.amount || Number(e.amount) <= 0)
        errs[e.id] = "Enter a positive amount";
    });
    set((s) => ({ errors: { ...s.errors, expenses: errs } }));
    return Object.keys(errs).length === 0;
  },
  clearExpenseError: (id) =>
    set((s) => ({
      errors: {
        ...s.errors,
        expenses: {
          ...(s.errors.expenses ?? {}),
          [id]: "",
        },
      },
    })),
}));

export { PRESET_CATEGORIES };
