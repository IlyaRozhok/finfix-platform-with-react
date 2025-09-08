import { Category } from "../categories/category.entity";
import { Installment } from "../installments/installment.entity";
import { Debt } from "../debts/debt.entity";
import { User } from "@/users/user.entity";
import { TransactionType } from "./types";
export declare class Transaction {
    id: string;
    userId: string;
    user: User;
    type: TransactionType;
    categoryId?: string | null;
    category?: Category | null;
    installmentId?: string | null;
    installment?: Installment | null;
    debtId?: string | null;
    debt?: Debt | null;
    amount: string;
    occurredAt: Date;
    note?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
