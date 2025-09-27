import { CategoryKind } from "@/onboarding/onboarding.entity";

export const categories = [
  { kind: CategoryKind.EXPENSE, name: "House", isSystem: true },
  {
    kind: CategoryKind.EXPENSE,
    name: "Food & Drinks",
    isSystem: true,
  },
  { kind: CategoryKind.EXPENSE, name: "Transport", isSystem: true },
  {
    kind: CategoryKind.EXPENSE,
    name: "Restaurant",
    isSystem: true,
  },
  {
    kind: CategoryKind.EXPENSE,
    name: "Coffee or snacks",
    isSystem: true,
  },
  { kind: CategoryKind.EXPENSE, name: "Sport", isSystem: true },
  { kind: CategoryKind.EXPENSE, name: "Health", isSystem: true },
  {
    kind: CategoryKind.EXPENSE,
    name: "Personal Care",
    isSystem: true,
  },
  { kind: CategoryKind.EXPENSE, name: "Cinema", isSystem: true },
  { kind: CategoryKind.EXPENSE, name: "Gifts", isSystem: true },
  {
    kind: CategoryKind.EXPENSE,
    name: "Telecommunication",
    isSystem: true,
  },
  {
    kind: CategoryKind.EXPENSE,
    name: "Emergency fund",
    isSystem: true,
  },
  { kind: CategoryKind.EXPENSE, name: "Family", isSystem: true },

  { kind: CategoryKind.INCOME, name: "Salary", isSystem: true },
  { kind: CategoryKind.INCOME, name: "Freelance", isSystem: true },
];
