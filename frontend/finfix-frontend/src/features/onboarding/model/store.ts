import { create } from "zustand";
import { OnboardingData } from "./types";
import { Expense } from "@/entities/expenses/model";
import { Debt } from "@/entities/debts/model";

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

const mkDebt = (): Debt => ({
  id: crypto.randomUUID(),
  debtType: "credit_card",
  description: "",
  totalDebt: "",
  monthlyPayment: "",
  interestRateMonthly: "",
});

const mkRow = (): Expense => ({
  id: crypto.randomUUID(),
  userId: "",
  categoryId: "Other",
  description: "",
  amount: "",
  frequency: "monthly",
});

const isEmptyDebt = (d: Debt) =>
  !d.description && !d.totalDebt && !d.monthlyPayment && !d.interestRateMonthly;

const isValidDebt = (d: Debt) => {
  const totalOk = Number(d.totalDebt) > 0;
  const monthOk = Number(d.monthlyPayment) > 0;
  const rateOk = Number(d.interestRateMonthly) > 0;

  switch (d.debtType) {
    case "credit_card":
      return totalOk && monthOk && rateOk;
    default: // bank_loan | mortgage | car | other
      return totalOk && monthOk;
  }
};

type OnboardingState = {
  data: OnboardingData;
  errors: {
    incomes: string;
    expenses?: Record<string, string>;
    debts?: Record<string, string>;
  };
  setCurrency: (currencyId: string) => void;
  setIncomes: (amount: string) => void;
  setIncomesError: (message: string) => void;
  clearIncomesError: () => void;
  addExpense: () => void;
  removeExpense: (id: string) => void;
  updateExpense: <K extends keyof Expense>(
    id: string,
    key: K,
    value: Expense[K],
    userId: string
  ) => void;
  validateExpenses: () => boolean;
  clearExpenseError: (id: string) => void;
  addDebt: () => void;
  removeDebt: (id: string) => void;
  updateDebt: <K extends keyof Debt>(id: string, k: K, v: Debt[K]) => void;
  validateDebts: () => boolean;
  clearDebtError: (id: string) => void;
  validateDebtRow: (id: string) => void;
};

export const useOnboarding = create<OnboardingState>((set, get) => ({
  data: {
    baseCurrency: "UAH",
    incomes: "",
    expenses: [mkRow()],
    debts: [],
  },
  errors: { incomes: "", expenses: {}, debts: {} },

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

  updateExpense: (id, key, value, userId) =>
    set((s) => {
      console.log("s", s);
      return {
        data: {
          ...s.data,
          expenses: s.data.expenses.map((e) =>
            e.id === id ? { ...e, [key]: value, userId } : e
          ),
        },
      };
    }),

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
  addDebt: () =>
    set((s) => ({ data: { ...s.data, debts: [...s.data.debts, mkDebt()] } })),

  removeDebt: (id) =>
    set((s) => ({
      data: { ...s.data, debts: s.data.debts.filter((d) => d.id !== id) },
      errors: {
        ...s.errors,
        debts: Object.fromEntries(
          Object.entries(s.errors.debts ?? {}).filter(([k]) => k !== id)
        ),
      },
    })),

  updateDebt: (id, k, v) =>
    set((s) => {
      const debts = s.data.debts.map((d) =>
        d.id === id ? { ...d, [k]: v } : d
      );

      const row = debts.find((d) => d.id === id)!;
      const debtsErrors = { ...(s.errors.debts ?? {}) };

      if (isEmptyDebt(row) || isValidDebt(row)) {
        debtsErrors[id] = "";
      } else {
        debtsErrors[id] =
          row.debtType === "credit_card"
            ? "Enter total, monthly and % per month"
            : "Enter total and monthly";
      }

      return {
        data: { ...s.data, debts },
        errors: { ...s.errors, debts: debtsErrors },
      };
    }),

  clearDebtError: (id) =>
    set((s) => ({
      errors: { ...s.errors, debts: { ...(s.errors.debts ?? {}), [id]: "" } },
    })),

  validateDebts: () => {
    const { debts } = get().data;
    const errs: Record<string, string> = {};
    console.log("[validateDebts] debts=", debts); // <-- лог 1
    for (const d of debts) {
      const valid = isValidDebt(d);
      if (!valid) {
        errs[d.id] =
          d.debtType === "credit_card"
            ? "Enter total, monthly and % per month"
            : "Enter total and monthly";
      }
      console.log("[validateDebts] row", d.id, { valid, err: errs[d.id] }); // <-- лог 2
    }
    set((s) => ({ errors: { ...s.errors, debts: errs } }));
    console.log("[validateDebts] errs=", errs); // <-- лог 3
    return Object.keys(errs).length === 0;
  },
  validateDebtRow: (id) =>
    set((s) => {
      const row = s.data.debts.find((d) => d.id === id);
      if (!row) return s;

      const debtsErrors = { ...(s.errors.debts ?? {}) };
      if (isEmptyDebt(row) || isValidDebt(row)) {
        debtsErrors[id] = "";
      } else {
        debtsErrors[id] =
          row.debtType === "credit_card"
            ? "Enter total, monthly and % per month"
            : "Enter total and monthly";
      }
      return { ...s, errors: { ...s.errors, debts: debtsErrors } };
    }),
}));

export { PRESET_CATEGORIES };
