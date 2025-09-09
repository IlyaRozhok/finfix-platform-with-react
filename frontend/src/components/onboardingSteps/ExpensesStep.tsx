
import { useState } from "react";
import { useOnboardingStore, type ExpenseData } from "../../store/onboarding";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowLeft, Plus, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const EXPENSE_CATEGORIES = [
  { value: "housing", label: "Housing (Rent/Mortgage)" },
  { value: "utilities", label: "Utilities" },
  { value: "food", label: "Food & Groceries" },
  { value: "transportation", label: "Transportation" },
  { value: "insurance", label: "Insurance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "entertainment", label: "Entertainment" },
  { value: "education", label: "Education" },
  { value: "savings", label: "Savings" },
  { value: "other", label: "Other" },
];

interface ExpenseFormData extends ExpenseData {
  id: string;
}

export function ExpensesStep() {
  const { prevStep, nextStep, data, updateData } = useOnboardingStore();

  const [expenses, setExpenses] = useState<ExpenseFormData[]>(
    data.fixedExpenses.length > 0
      ? data.fixedExpenses.map((expense, index) => ({
          ...expense,
          id: `expense_${index}`,
        }))
      : []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    expenses.forEach((expense, index) => {
      if (!expense.category_id) {
        newErrors[`category_${index}`] = "Please select a category.";
      }

      if (!expense.amount || expense.amount <= 0) {
        newErrors[`amount_${index}`] = "Please enter a valid amount.";
      }

      if (!expense.description?.trim()) {
        newErrors[`description_${index}`] = "Please enter a description.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (expenses.length > 0 && !validateForm()) return;

    const validExpenses = expenses.map((expense) => ({
      id: expense.id,
      category_id: expense.category_id,
      category_name: expense.category_name,
      amount: expense.amount,
      description: expense.description,
    }));
    updateData({ fixedExpenses: validExpenses });
    nextStep();
  };

  const handleBack = () => {
    prevStep();
  };

  const addExpenseRow = () => {
    const newExpense: ExpenseFormData = {
      id: uuidv4(),
      category_id: "",
      category_name: "",
      amount: 0,
      description: "",
    };
    setExpenses([...expenses, newExpense]);
  };

  const removeExpenseRow = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const updateExpenseRow = (
    id: string,
    field: keyof ExpenseData,
    value: string | number | undefined
  ) => {
    setExpenses(
      expenses.map((expense) => {
        if (expense.id === id) {
          const updatedExpense = { ...expense, [field]: value };

          // Update category_name when category_id changes
          if (field === "category_id") {
            const category = EXPENSE_CATEGORIES.find(
              (cat) => cat.value === value
            );
            updatedExpense.category_name = category?.label || "";
          }

          return updatedExpense;
        }
        return expense;
      })
    );

    // Clear errors when user starts typing
    setErrors((prev) => {
      const newErrors = { ...prev };
      const index = expenses.findIndex((e) => e.id === id);
      delete newErrors[`${field}_${index}`];
      return newErrors;
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          What are your fixed monthly expenses?
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Add recurring expenses that happen every month, like rent, utilities,
          and subscriptions.
        </p>
      </div>

      {/* Expense Rows */}
      {expenses.length > 0 && (
        <div className="space-y-4">
          {expenses.map((expense, index) => (
            <div
              key={expense.id}
              className="space-y-4 p-4 border rounded-lg relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => removeExpenseRow(expense.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Category</Label>
                  <Select
                    value={expense.category_id}
                    onValueChange={(value) =>
                      updateExpenseRow(expense.id, "category_id", value)
                    }
                  >
                    <SelectTrigger
                      className={
                        errors[`category_${index}`] ? "border-destructive" : ""
                      }
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPENSE_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors[`category_${index}`] && (
                    <p className="text-sm text-destructive">
                      {errors[`category_${index}`]}
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Amount</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={expense.amount || ""}
                    onChange={(e) =>
                      updateExpenseRow(
                        expense.id,
                        "amount",
                        Number(e.target.value)
                      )
                    }
                    className={
                      errors[`amount_${index}`] ? "border-destructive" : ""
                    }
                  />
                  {errors[`amount_${index}`] && (
                    <p className="text-sm text-destructive">
                      {errors[`amount_${index}`]}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium">Description</Label>
                  <Input
                    placeholder="e.g., Netflix subscription, Gym membership"
                    value={expense.description || ""}
                    onChange={(e) =>
                      updateExpenseRow(
                        expense.id,
                        "description",
                        e.target.value
                      )
                    }
                    className={
                      errors[`description_${index}`] ? "border-destructive" : ""
                    }
                  />
                  {errors[`description_${index}`] && (
                    <p className="text-sm text-destructive">
                      {errors[`description_${index}`]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Expense Button */}
      <Button
        type="button"
        variant="outline"
        onClick={addExpenseRow}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add an expense
      </Button>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-4">
        <Button
          onClick={handleContinue}
          size="lg"
          className="w-full font-medium"
        >
          Continue
        </Button>
        <Button
          onClick={handleBack}
          variant="ghost"
          size="lg"
          className="w-full font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
}
