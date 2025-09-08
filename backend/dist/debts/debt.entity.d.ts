import { User } from "@/users/user.entity";
export declare enum DebtType {
    LOAN = "loan",
    CREDIT_CARD = "credit_card"
}
export declare class Debt {
    id: string;
    userId: string;
    user: User;
    description: string;
    debtType: DebtType;
    totalDebt: string;
    monthlyPayment?: string | null;
    interestRateMonthly?: string | null;
    gracePeriodDays?: number | null;
    startDate: string;
    statementDay?: number | null;
    dueDay?: number | null;
    isClosed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
