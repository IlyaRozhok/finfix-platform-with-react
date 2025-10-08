export type Debt = {
  id: string;
  debtType: "credit_card" | "bank_loan" | "mortgage" | "car" | "other";
  description: string;
  totalDebt: string; 
  monthlyPayment: string;
  interestRateMonthly: string; // в %, строкой "2.5"
};
