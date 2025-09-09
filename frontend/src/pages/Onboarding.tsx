import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/radix-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/radix-card";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import DatePicker from "@/components/ui/DatePicker";

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<
    "welcome" | "currency" | "income" | "expenses" | "debts" | "installments"
  >("welcome");
  const [currency, setCurrency] = useState<string>("");
  const [income, setIncome] = useState<{
    name: string;
    amount: string;
    payday: string;
  }>({ name: "", amount: "", payday: "" });
  const [expenses, setExpenses] = useState<
    Array<{
      description: string;
      amount: string;
      is_mandatory: boolean;
      start_date: string;
    }>
  >([]);
  const [debts, setDebts] = useState<
    Array<{
      description: string;
      debt_type: string;
      total_debt: string;
      monthly_payment: string;
      interest_rate_monthly: string;
      grace_period_days: string;
      start_date: string;
      statement_day: string;
      due_day: string;
    }>
  >([]);
  const [installments, setInstallments] = useState<
    Array<{
      description: string;
      total_amount: string;
      monthly_payment: string;
      total_payments: string;
      start_date: string;
    }>
  >([]);
  const [error, setError] = useState<string>("");

  const getProgress = () => {
    switch (currentStep) {
      case "welcome":
        return 0;
      case "currency":
        return 17;
      case "income":
        return 33;
      case "expenses":
        return 50;
      case "debts":
        return 67;
      case "installments":
        return 83;
      default:
        return 0;
    }
  };

  const handleNext = () => {
    if (currentStep === "welcome") {
      setCurrentStep("currency");
    } else if (currentStep === "currency") {
      if (!currency) {
        setError("Please select a currency to continue.");
        return;
      }
      setError("");
      setCurrentStep("income");
    } else if (currentStep === "income") {
      if (!income.name || !income.amount || !income.payday) {
        setError("Please fill in all income fields to continue.");
        return;
      }
      setError("");
      setCurrentStep("expenses");
    } else if (currentStep === "expenses") {
      setError("");
      setCurrentStep("debts");
    } else if (currentStep === "debts") {
      setError("");
      setCurrentStep("installments");
    } else if (currentStep === "installments") {
      console.log("Onboarding completed with data:", {
        currency,
        income,
        expenses,
        debts,
        installments,
      });
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep === "currency") {
      setCurrentStep("welcome");
    } else if (currentStep === "income") {
      setCurrentStep("currency");
    } else if (currentStep === "expenses") {
      setCurrentStep("income");
    } else if (currentStep === "debts") {
      setCurrentStep("expenses");
    } else if (currentStep === "installments") {
      setCurrentStep("debts");
    }
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    setError("");
  };

  const handleIncomeChange = (field: string, value: string) => {
    setIncome((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const addExpense = () => {
    setExpenses((prev) => [
      ...prev,
      {
        description: "",
        amount: "",
        is_mandatory: false,
        start_date: "",
      },
    ]);
  };

  const updateExpense = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    setExpenses((prev) =>
      prev.map((expense, i) =>
        i === index ? { ...expense, [field]: value } : expense
      )
    );
  };

  const removeExpense = (index: number) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  const addDebt = () => {
    setDebts((prev) => [
      ...prev,
      {
        description: "",
        debt_type: "LOAN",
        total_debt: "",
        monthly_payment: "",
        interest_rate_monthly: "",
        grace_period_days: "",
        start_date: "",
        statement_day: "",
        due_day: "",
      },
    ]);
  };

  const updateDebt = (index: number, field: string, value: string) => {
    setDebts((prev) =>
      prev.map((debt, i) => (i === index ? { ...debt, [field]: value } : debt))
    );
  };

  const removeDebt = (index: number) => {
    setDebts((prev) => prev.filter((_, i) => i !== index));
  };

  const addInstallment = () => {
    setInstallments((prev) => [
      ...prev,
      {
        description: "",
        total_amount: "",
        monthly_payment: "",
        total_payments: "",
        start_date: "",
      },
    ]);
  };

  const updateInstallment = (index: number, field: string, value: string) => {
    setInstallments((prev) =>
      prev.map((installment, i) =>
        i === index ? { ...installment, [field]: value } : installment
      )
    );
  };

  const removeInstallment = (index: number) => {
    setInstallments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-4xl shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Progress Bar - Only show for steps after welcome */}
          {currentStep !== "welcome" && (
            <div className="px-8 pt-6 pb-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Step 1 of 1</span>
                  <span>{Math.round(getProgress())}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-900 h-2 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="flex-1 flex flex-col justify-center p-8">
            {currentStep === "welcome" && (
              <Card className="max-w-md mx-auto w-full">
                <CardHeader className="text-center space-y-4">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl font-bold">
                      Welcome to FinFix
                    </CardTitle>
                    <CardDescription className="text-xl">
                      Let's set up your money in minutes.
                    </CardDescription>
                    <p className="text-muted-foreground leading-relaxed">
                      We'll ask a few quick questions to personalize your
                      dashboard. You can edit everything later.
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button
                    onClick={handleNext}
                    className="w-full h-12 text-base font-medium"
                    size="lg"
                  >
                    Get started
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === "currency" && (
              <Card className="max-w-md mx-auto w-full">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-3xl font-bold">
                    Choose your primary currency
                  </CardTitle>
                  <CardDescription className="text-base">
                    This sets the default for balances, budgets, and reports.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Select
                      value={currency}
                      onChange={handleCurrencyChange}
                      options={[
                        { value: "USD", label: "USD — US Dollar ($)" },
                        { value: "EUR", label: "EUR — Euro (€)" },
                        { value: "UAH", label: "UAH — Ukrainian Hryvnia (₴)" },
                        { value: "GBP", label: "GBP — British Pound (£)" },
                        { value: "JPY", label: "JPY — Japanese Yen (¥)" },
                        { value: "CAD", label: "CAD — Canadian Dollar (C$)" },
                        { value: "AUD", label: "AUD — Australian Dollar (A$)" },
                        { value: "CHF", label: "CHF — Swiss Franc (CHF)" },
                        { value: "CNY", label: "CNY — Chinese Yuan (¥)" },
                        { value: "INR", label: "INR — Indian Rupee (₹)" },
                        { value: "BRL", label: "BRL — Brazilian Real (R$)" },
                        { value: "RUB", label: "RUB — Russian Ruble (₽)" },
                        { value: "KRW", label: "KRW — South Korean Won (₩)" },
                        { value: "MXN", label: "MXN — Mexican Peso ($)" },
                        { value: "SGD", label: "SGD — Singapore Dollar (S$)" },
                      ]}
                      placeholder="Select a currency (e.g., UAH — Ukrainian Hryvnia)"
                      label="Primary currency"
                      error={error}
                      required
                      searchable
                    />
                    {error && (
                      <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      Back
                    </Button>
                    <Button onClick={handleNext} size="lg" className="px-8">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === "income" && (
              <Card className="max-w-md mx-auto w-full">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-3xl font-bold">
                    Tell us about your monthly income
                  </CardTitle>
                  <CardDescription className="text-base">
                    Add your recurring income after taxes. If it varies, use an
                    average.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Input
                    type="text"
                    value={income.name}
                    onChange={(e) => handleIncomeChange("name", e.target.value)}
                    placeholder="Enter income source name"
                    label="Name (e.g., Salary, Freelance Retainer)"
                    error={
                      error && !income.name ? "This field is required" : ""
                    }
                    required
                  />

                  <Input
                    type="number"
                    value={income.amount}
                    onChange={(e) =>
                      handleIncomeChange("amount", e.target.value)
                    }
                    placeholder="0.00"
                    label="Amount/month"
                    error={
                      error && !income.amount ? "This field is required" : ""
                    }
                    required
                    step="0.01"
                    min="0"
                    leftIcon={
                      <span className="text-gray-500 text-sm">
                        {currency === "USD"
                          ? "$"
                          : currency === "EUR"
                          ? "€"
                          : currency === "UAH"
                          ? "₴"
                          : currency}
                      </span>
                    }
                  />

                  <DatePicker
                    value={income.payday}
                    onChange={(value) => handleIncomeChange("payday", value)}
                    label="Payday"
                    placeholder="Select payday"
                    error={
                      error && !income.payday ? "This field is required" : ""
                    }
                    required
                  />

                  {error && (
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      Back
                    </Button>
                    <Button onClick={handleNext} size="lg" className="px-8">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === "expenses" && (
              <div className="max-w-2xl mx-auto w-full space-y-8">
                <Card>
                  <CardHeader className="text-center space-y-4">
                    <CardTitle className="text-3xl font-bold">
                      Add your fixed monthly expenses
                    </CardTitle>
                    <CardDescription className="text-base">
                      Bills and subscriptions you pay every month. Estimates are
                      fine.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {expenses.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                          No expenses added yet
                        </p>
                        <Button onClick={addExpense} variant="outline">
                          Add First Expense
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {expenses.map((expense, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="font-medium">
                                Expense #{index + 1}
                              </h3>
                              <Button
                                onClick={() => removeExpense(index)}
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                Remove
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input
                                type="text"
                                value={expense.description}
                                onChange={(e) =>
                                  updateExpense(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., Rent, Netflix, Gym"
                                label="Description"
                              />

                              <Input
                                type="number"
                                value={expense.amount}
                                onChange={(e) =>
                                  updateExpense(index, "amount", e.target.value)
                                }
                                placeholder="0.00"
                                label="Amount/month"
                                step="0.01"
                                min="0"
                                leftIcon={
                                  <span className="text-gray-500 text-sm">
                                    {currency === "USD"
                                      ? "$"
                                      : currency === "EUR"
                                      ? "€"
                                      : currency === "UAH"
                                      ? "₴"
                                      : currency}
                                  </span>
                                }
                              />

                              <DatePicker
                                value={expense.start_date}
                                onChange={(value) =>
                                  updateExpense(index, "start_date", value)
                                }
                                label="Start Date"
                                placeholder="Select start date"
                              />

                              <Select
                                value={
                                  expense.is_mandatory
                                    ? "mandatory"
                                    : "optional"
                                }
                                onChange={(value) =>
                                  updateExpense(
                                    index,
                                    "is_mandatory",
                                    value === "mandatory"
                                  )
                                }
                                options={[
                                  { value: "mandatory", label: "Mandatory" },
                                  { value: "optional", label: "Optional" },
                                ]}
                                label="Type"
                                placeholder="Select expense type"
                              />
                            </div>
                          </Card>
                        ))}

                        <Button
                          onClick={addExpense}
                          variant="outline"
                          className="w-full border-dashed"
                        >
                          + Add Another Expense
                        </Button>
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        size="lg"
                        className="px-8"
                      >
                        Back
                      </Button>
                      <Button onClick={handleNext} size="lg" className="px-8">
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === "debts" && (
              <div className="max-w-4xl mx-auto w-full space-y-8">
                <div className="space-y-4 text-center">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Do you have any loans or credit balances?
                  </h1>
                  <p className="text-gray-500 leading-relaxed">
                    Add active loans and credit cards so we can track balances
                    and due dates.
                  </p>
                </div>

                <div className="space-y-6">
                  {debts.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        No loans or credit cards added yet
                      </p>
                      <button
                        onClick={addDebt}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        Add First Loan/Credit
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {debts.map((debt, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-6 space-y-4"
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900">
                              Debt #{index + 1}
                            </h3>
                            <button
                              onClick={() => removeDebt(index)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Description
                              </label>
                              <input
                                type="text"
                                value={debt.description}
                                onChange={(e) =>
                                  updateDebt(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., Car Loan, Credit Card"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Type
                              </label>
                              <select
                                value={debt.debt_type}
                                onChange={(e) =>
                                  updateDebt(index, "debt_type", e.target.value)
                                }
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                              >
                                <option value="LOAN">Loan</option>
                                <option value="CREDIT_CARD">Credit Card</option>
                                <option value="MORTGAGE">Mortgage</option>
                                <option value="STUDENT_LOAN">
                                  Student Loan
                                </option>
                                <option value="PERSONAL_LOAN">
                                  Personal Loan
                                </option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Total Debt
                              </label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                  {currency === "USD"
                                    ? "$"
                                    : currency === "EUR"
                                    ? "€"
                                    : currency === "UAH"
                                    ? "₴"
                                    : currency}
                                </span>
                                <input
                                  type="number"
                                  value={debt.total_debt}
                                  onChange={(e) =>
                                    updateDebt(
                                      index,
                                      "total_debt",
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  step="0.01"
                                  min="0"
                                  className="w-full h-10 pl-8 pr-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Monthly Payment
                              </label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                  {currency === "USD"
                                    ? "$"
                                    : currency === "EUR"
                                    ? "€"
                                    : currency === "UAH"
                                    ? "₴"
                                    : currency}
                                </span>
                                <input
                                  type="number"
                                  value={debt.monthly_payment}
                                  onChange={(e) =>
                                    updateDebt(
                                      index,
                                      "monthly_payment",
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  step="0.01"
                                  min="0"
                                  className="w-full h-10 pl-8 pr-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Interest Rate (%/month)
                              </label>
                              <input
                                type="number"
                                value={debt.interest_rate_monthly}
                                onChange={(e) =>
                                  updateDebt(
                                    index,
                                    "interest_rate_monthly",
                                    e.target.value
                                  )
                                }
                                placeholder="0.000"
                                step="0.001"
                                min="0"
                                max="100"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Grace Period (days)
                              </label>
                              <input
                                type="number"
                                value={debt.grace_period_days}
                                onChange={(e) =>
                                  updateDebt(
                                    index,
                                    "grace_period_days",
                                    e.target.value
                                  )
                                }
                                placeholder="0"
                                min="0"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Start Date
                              </label>
                              <input
                                type="date"
                                value={debt.start_date}
                                onChange={(e) =>
                                  updateDebt(
                                    index,
                                    "start_date",
                                    e.target.value
                                  )
                                }
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Statement Day
                              </label>
                              <input
                                type="number"
                                value={debt.statement_day}
                                onChange={(e) =>
                                  updateDebt(
                                    index,
                                    "statement_day",
                                    e.target.value
                                  )
                                }
                                placeholder="1-31"
                                min="1"
                                max="31"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Due Day
                              </label>
                              <input
                                type="number"
                                value={debt.due_day}
                                onChange={(e) =>
                                  updateDebt(index, "due_day", e.target.value)
                                }
                                placeholder="1-31"
                                min="1"
                                max="31"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={addDebt}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                      >
                        + Add Another Loan/Credit
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={handleBack}
                    className="px-8 h-12 text-base font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 rounded-lg bg-white cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-8 h-12 text-base font-medium bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow-md transition-all duration-200 rounded-lg border-0 cursor-pointer"
                  >
                    Complete Setup
                  </button>
                </div>
              </div>
            )}

            {currentStep === "installments" && (
              <div className="max-w-4xl mx-auto w-full space-y-8">
                <div className="space-y-4 text-center">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Any installment plans?
                  </h1>
                  <p className="text-gray-500 leading-relaxed">
                    Add buy-now-pay-later or store installment plans to forecast
                    your cash flow.
                  </p>
                </div>

                <div className="space-y-6">
                  {installments.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        No installment plans added yet
                      </p>
                      <button
                        onClick={addInstallment}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        Add First Installment Plan
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {installments.map((installment, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-6 space-y-4"
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900">
                              Installment #{index + 1}
                            </h3>
                            <button
                              onClick={() => removeInstallment(index)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Description
                              </label>
                              <input
                                type="text"
                                value={installment.description}
                                onChange={(e) =>
                                  updateInstallment(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., iPhone 15, Furniture, Electronics"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Total Amount
                              </label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                  {currency === "USD"
                                    ? "$"
                                    : currency === "EUR"
                                    ? "€"
                                    : currency === "UAH"
                                    ? "₴"
                                    : currency}
                                </span>
                                <input
                                  type="number"
                                  value={installment.total_amount}
                                  onChange={(e) =>
                                    updateInstallment(
                                      index,
                                      "total_amount",
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  step="0.01"
                                  min="0"
                                  className="w-full h-10 pl-8 pr-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Monthly Payment
                              </label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                  {currency === "USD"
                                    ? "$"
                                    : currency === "EUR"
                                    ? "€"
                                    : currency === "UAH"
                                    ? "₴"
                                    : currency}
                                </span>
                                <input
                                  type="number"
                                  value={installment.monthly_payment}
                                  onChange={(e) =>
                                    updateInstallment(
                                      index,
                                      "monthly_payment",
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  step="0.01"
                                  min="0"
                                  className="w-full h-10 pl-8 pr-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Total Payments
                              </label>
                              <input
                                type="number"
                                value={installment.total_payments}
                                onChange={(e) =>
                                  updateInstallment(
                                    index,
                                    "total_payments",
                                    e.target.value
                                  )
                                }
                                placeholder="12"
                                min="1"
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Start Date
                              </label>
                              <input
                                type="date"
                                value={installment.start_date}
                                onChange={(e) =>
                                  updateInstallment(
                                    index,
                                    "start_date",
                                    e.target.value
                                  )
                                }
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 block">
                                Payment Info
                              </label>
                              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                                {installment.total_amount &&
                                installment.monthly_payment &&
                                installment.total_payments
                                  ? `$${parseFloat(
                                      installment.total_amount || "0"
                                    ).toFixed(2)} ÷ ${
                                      installment.total_payments
                                    } payments = $${parseFloat(
                                      installment.monthly_payment || "0"
                                    ).toFixed(2)}/month`
                                  : "Enter amounts to see payment breakdown"}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={addInstallment}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                      >
                        + Add Another Installment Plan
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={handleBack}
                    className="px-8 h-12 text-base font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 rounded-lg bg-white cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-8 h-12 text-base font-medium bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow-md transition-all duration-200 rounded-lg border-0 cursor-pointer"
                  >
                    Complete Setup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
