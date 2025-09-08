import { Category } from "@/categories/category.entity";
import { Debt } from "@/debts/debt.entity";
import { Installment } from "@/installments/installment.entity";
import { RecurringExpense } from "@/recurring-expenses/recurring-expense.entity";
import { RecurringIncome } from "@/recurring-incomes/recurring-income.entity";
import { Transaction } from "@/transactions/transaction.entity";
export declare class User {
    id: string;
    email: string;
    googleSub: string;
    userName: string;
    avatarUrl: string | null;
    isOnboarded: boolean;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    categories: Category[];
    recurringExpenses: RecurringExpense[];
    recurringIncomes: RecurringIncome[];
    installments: Installment[];
    debts: Debt[];
    transactions: Transaction[];
}
