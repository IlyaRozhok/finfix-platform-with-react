export type Expense = {
  id: string;
  userId: string;
  categoryId: string;
  description?: string;
  amount: string;
  startDate?: string;
  endDate?: string;
  isMandatory?: string;
  frequency: string;
};
