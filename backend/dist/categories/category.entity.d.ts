import { User } from "@/users/user.entity";
export declare enum CategoryKind {
    EXPENSE = "expense",
    INCOME = "income"
}
export declare class Category {
    id: string;
    userId: string;
    user: User;
    kind: CategoryKind;
    name: string;
    isSystem: boolean;
}
