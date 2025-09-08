import { Category } from "../categories/category.entity";
import { User } from "@/users/user.entity";
export declare class RecurringExpense {
    id: string;
    userId: string;
    user: User;
    categoryId: string;
    category: Category;
    description: string;
    amount: string;
    isMandatory: boolean;
    startDate: string;
    endDate?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
