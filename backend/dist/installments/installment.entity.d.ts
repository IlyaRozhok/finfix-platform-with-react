import { User } from "@/users/user.entity";
export declare class Installment {
    id: string;
    userId: string;
    user: User;
    description: string;
    startDate: string;
    totalAmount: string;
    monthlyPayment: string;
    totalPayments: number;
    isClosed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
