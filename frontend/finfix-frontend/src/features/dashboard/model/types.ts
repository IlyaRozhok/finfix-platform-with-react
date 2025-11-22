import { Debt } from "@/entities/debts/model";

export type Expense = {
  id: string;
  userId: string;
  categoryId: string;
  description: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
};

export type Installment = {
  id: string;
  userId: string;
  description: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  monthlyPayment: string;
  totalPayments: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStats = {
  incomes: number;
  debts: Debt[];
  expenses: Expense[];
  installments: Installment[];
  monthlyNetworth: number;
  monthlyObligations: number;
};

