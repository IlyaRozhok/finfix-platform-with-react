import { create } from "zustand";
import { OnboardingData, Installment } from "./types";
import { ReqUserExpense } from "@/features/onboarding/model/types";
import { Debt } from "@/entities/debts/model";
import { createUserOnboardingCurrency, deleteDebt } from "../api";

const mkDebt = (): Debt => ({
  description: "",
  totalDebt: "",
  interest: "",
});

const mkRow = (categoryId?: string): ReqUserExpense => ({
  id: crypto.randomUUID(),
  userId: "",
  categoryId: categoryId || "",
  description: "",
  amount: "",
});

const mkInstallment = (): Installment => ({
  id: crypto.randomUUID(),
  description: "",
  startDate: "",
  totalAmount: "",
  totalPayments: "",
});

const isEmptyDebt = (d: Debt) => !d.description && !d.totalDebt;

const isValidDebt = (d: Debt) => {
  const totalOk = Number(d.totalDebt) > 0;
  return Boolean(totalOk);
};

type OnboardingState = {
  data: OnboardingData;
  originalData: OnboardingData;
  errors: {
    incomes: string;
    expenses?: Record<string, string>;
    debts?: Record<string, string>;
    installments?: Record<string, string>;
  };
  setCurrency: (userId: string, currency: string) => Promise<void>;
  setIncomes: (amount: string) => void;
  setIncomesError: (message: string) => void;
  clearIncomesError: () => void;
  addExpense: (categoryId?: string) => void;
  setExpenses: (expenses: ReqUserExpense[]) => void;
  removeExpense: (id: string) => void;
  updateExpense: <K extends keyof ReqUserExpense>(
    id: string,
    key: K,
    value: ReqUserExpense[K],
    userId: string
  ) => void;
  validateExpenses: () => boolean;
  clearExpenseError: (id: string) => void;
  addDebt: () => void;
  setDebts: (debts: Debt[]) => void;
  removeDebt: (id: string) => void;
  updateDebt: <K extends keyof Debt>(id: string, k: K, v: Debt[K]) => void;
  validateDebts: () => boolean;
  clearDebtError: (id: string) => void;
  validateDebtRow: (id: string) => void;
  hasExpensesChanged: () => boolean;
  hasDebtsChanged: () => boolean;
  // Installments
  addInstallment: () => void;
  setInstallments: (installments: Installment[]) => void;
  removeInstallment: (id: string) => void;
  updateInstallment: <K extends keyof Installment>(
    id: string,
    k: K,
    v: Installment[K]
  ) => void;
  validateInstallments: () => boolean;
  clearInstallmentError: (id: string) => void;
  hasInstallmentsChanged: () => boolean;
};

export const useOnboarding = create<OnboardingState>((set, get) => ({
  data: {
    baseCurrency: "UAH",
    incomes: "",
    expenses: [],
    debts: [],
    installments: [],
  },
  originalData: {
    baseCurrency: "UAH",
    incomes: "",
    expenses: [],
    debts: [],
    installments: [],
  },
  errors: { incomes: "", expenses: {}, debts: {}, installments: {} },

  setCurrency: async (userId, currency) => {
    try {
      const response = await createUserOnboardingCurrency({
        uid: userId,
        currency,
      });
      if (response) {
        set((s) => ({ data: { ...s.data, baseCurrency: currency } }));
      }
    } catch (error) {
      console.error("Failed to update currency:", error);
    }
  },
  setIncomes: (amount) =>
    set((s) => ({ data: { ...s.data, incomes: amount } })),
  setIncomesError: (message) =>
    set((s) => ({ errors: { ...s.errors, incomes: message } })),
  clearIncomesError: () =>
    set((s) => ({ errors: { ...s.errors, incomes: "" } })),

  addExpense: (categoryId) =>
    set((s) => ({
      data: { ...s.data, expenses: [...s.data.expenses, mkRow(categoryId)] },
    })),

  setExpenses: (expenses) =>
    set((s) => ({
      data: { ...s.data, expenses },
      originalData: { ...s.originalData, expenses },
    })),

  removeExpense: (id) =>
    set((s) => ({
      data: {
        ...s.data,
        expenses: s.data.expenses.filter((e) => e.id !== id),
      },
      errors: {
        ...s.errors,
        expenses: Object.fromEntries(
          Object.entries(s.errors.expenses ?? {}).filter(([k]) => k !== id)
        ),
      },
    })),

  updateExpense: (id, key, value, userId) =>
    set((s) => ({
      data: {
        ...s.data,
        expenses: s.data.expenses.map((e) =>
          e.id === id ? { ...e, [key]: value, userId } : e
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
  addDebt: () =>
    set((s) => ({ data: { ...s.data, debts: [...s.data.debts, mkDebt()] } })),

  setDebts: (debts) =>
    set((s) => ({
      data: { ...s.data, debts },
      originalData: { ...s.originalData, debts },
    })),

  removeDebt: (id) => {
    // Check if this debt exists on server (has a real ID, not a temporary one)
    const debt = get().data.debts.find((d) => d.id === id);
    const isExistingDebt = debt && debt.id;

    // If it's an existing debt, call API to delete it
    if (isExistingDebt) {
      deleteDebt(id);
    }

    // Always remove from local state
    set((s) => ({
      data: { ...s.data, debts: s.data.debts.filter((d) => d.id !== id) },
      errors: {
        ...s.errors,
        debts: Object.fromEntries(
          Object.entries(s.errors.debts ?? {}).filter(([k]) => k !== id)
        ),
      },
    }));
  },

  updateDebt: (id, k, v) => {
    set((s) => {
      const debts = s.data.debts.map((d) =>
        d.id === id ? { ...d, [k]: v } : d
      );

      const row = debts.find((d) => d.id === id)!;
      const debtsErrors = { ...(s.errors.debts ?? {}) };

      if (isEmptyDebt(row) || isValidDebt(row)) {
        debtsErrors[id] = "";
      }

      // Don't call API automatically - only update local state
      // API calls will happen on "Next" button click

      return {
        data: { ...s.data, debts },
        errors: { ...s.errors, debts: debtsErrors },
      };
    });
  },

  clearDebtError: (id) =>
    set((s) => ({
      errors: { ...s.errors, debts: { ...(s.errors.debts ?? {}), [id]: "" } },
    })),

  validateDebts: () => {
    const { debts } = get().data;
    const errs: Record<string, string> = {};
    console.log("[validateDebts] debts=", debts); // <-- лог 1
    set((s) => ({ errors: { ...s.errors, debts: errs } }));
    console.log("[validateDebts] errs=", errs); // <-- лог 3
    return Object.keys(errs).length === 0;
  },
  validateDebtRow: (id) =>
    set((s) => {
      const row = s.data.debts.find((d) => d.id === id);
      if (!row) return s;

      const debtsErrors = { ...(s.errors.debts ?? {}) };

      return { ...s, errors: { ...s.errors, debts: debtsErrors } };
    }),

  hasExpensesChanged: () => {
    const { data, originalData } = get();

    // Compare expenses arrays
    if (data.expenses.length !== originalData.expenses.length) {
      return true;
    }

    // Create maps for easier comparison
    const currentMap = new Map(data.expenses.map((exp) => [exp.id, exp]));
    const originalMap = new Map(
      originalData.expenses.map((exp) => [exp.id, exp])
    );

    // Check if all original expenses still exist and are unchanged
    for (const [id, originalExp] of originalMap) {
      const currentExp = currentMap.get(id);

      if (!currentExp) {
        // Expense was deleted
        return true;
      }

      if (
        currentExp.userId !== originalExp.userId ||
        currentExp.categoryId !== originalExp.categoryId ||
        currentExp.amount !== originalExp.amount ||
        currentExp.description !== originalExp.description
      ) {
        // Expense was modified
        return true;
      }
    }

    // Check if any new expenses were added
    for (const [id] of currentMap) {
      if (!originalMap.has(id)) {
        // New expense was added
        return true;
      }
    }

    return false;
  },

  hasDebtsChanged: () => {
    const { data, originalData } = get();

    // Get only existing debts (not temp ones) for comparison
    const currentExistingDebts = data.debts.filter((debt) => debt.id);
    const originalExistingDebts = originalData.debts.filter((debt) => debt.id);

    // Check if any new debts were added
    const hasNewDebts = data.debts.some((debt) => !debt.id);
    if (hasNewDebts) {
      return true;
    }

    // Compare existing debts arrays
    if (currentExistingDebts.length !== originalExistingDebts.length) {
      return true;
    }

    // Create maps for easier comparison
    const currentMap = new Map(
      currentExistingDebts.map((debt) => [debt.id, debt])
    );
    const originalMap = new Map(
      originalExistingDebts.map((debt) => [debt.id, debt])
    );

    // Check if all original debts still exist and are unchanged
    for (const [id, originalDebt] of originalMap) {
      const currentDebt = currentMap.get(id);

      if (!currentDebt) {
        // Debt was deleted
        return true;
      }

      if (
        currentDebt.description !== originalDebt.description ||
        currentDebt.totalDebt !== originalDebt.totalDebt ||
        currentDebt.interest !== originalDebt.interest
      ) {
        // Debt was modified
        return true;
      }
    }

    return false;
  },

  addInstallment: () =>
    set((s) => ({
      data: {
        ...s.data,
        installments: [...(s.data.installments || []), mkInstallment()],
      },
    })),

  setInstallments: (installments) =>
    set((s) => ({
      data: { ...s.data, installments },
      originalData: { ...s.originalData, installments },
    })),

  removeInstallment: (id) =>
    set((s) => ({
      data: {
        ...s.data,
        installments: (s.data.installments || []).filter(
          (inst) => inst.id !== id
        ),
      },
      errors: {
        ...s.errors,
        installments: Object.fromEntries(
          Object.entries(s.errors.installments ?? {}).filter(([k]) => k !== id)
        ),
      },
    })),

  updateInstallment: (id, k, v) =>
    set((s) => ({
      data: {
        ...s.data,
        installments: (s.data.installments || []).map((inst) =>
          inst.id === id ? { ...inst, [k]: v } : inst
        ),
      },
    })),

  validateInstallments: () => {
    const { installments } = get().data;
    const errs: Record<string, string> = {};
    (installments || []).forEach((inst) => {
      if (!inst.id) return;
      if (!inst.description) {
        errs[inst.id] = "Description is required";
      } else if (!inst.startDate) {
        errs[inst.id] = "Start date is required";
      } else if (!inst.totalAmount || Number(inst.totalAmount) <= 0) {
        errs[inst.id] = "Enter a positive total amount";
      } else if (!inst.totalPayments || Number(inst.totalPayments) <= 0) {
        errs[inst.id] = "Enter a positive number of payments";
      }
    });
    set((s) => ({ errors: { ...s.errors, installments: errs } }));
    return Object.keys(errs).length === 0;
  },

  clearInstallmentError: (id) =>
    set((s) => ({
      errors: {
        ...s.errors,
        installments: { ...(s.errors.installments ?? {}), [id]: "" },
      },
    })),

  hasInstallmentsChanged: () => {
    const { data, originalData } = get();

    const currentInstallments = data.installments || [];
    const originalInstallments = originalData.installments || [];

    if (currentInstallments.length !== originalInstallments.length) {
      return true;
    }

    const currentMap = new Map(
      currentInstallments.map((inst) => [inst.id, inst])
    );
    const originalMap = new Map(
      originalInstallments.map((inst) => [inst.id, inst])
    );

    for (const [id, originalInst] of originalMap) {
      const currentInst = currentMap.get(id);
      if (!currentInst) return true;
      if (
        currentInst.description !== originalInst.description ||
        currentInst.startDate !== originalInst.startDate ||
        currentInst.totalAmount !== originalInst.totalAmount ||
        currentInst.totalPayments !== originalInst.totalPayments
      ) {
        return true;
      }
    }

    const hasNewInstallments = currentInstallments.some((inst) => !inst.id);
    if (hasNewInstallments) {
      return true;
    }

    return false;
  },
}));
