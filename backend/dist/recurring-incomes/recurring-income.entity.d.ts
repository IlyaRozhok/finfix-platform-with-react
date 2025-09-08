import { User } from "@/users/user.entity";
export declare class RecurringIncome {
    id: string;
    userId: string;
    user: User;
    description: string;
    amount: string;
    startDate: string;
    endDate?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
