import { TransactionType } from "./types";
export declare class CreateTransactionDto {
    type: TransactionType;
    amount: number;
    occurredAt: string;
    categoryId?: string;
    installmentId?: string;
    debtId?: string;
    note?: string;
}
