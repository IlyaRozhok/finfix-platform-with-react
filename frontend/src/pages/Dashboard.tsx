import { useState } from "react";
import { Plus, Eye, EyeOff } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import OverviewSection from "@/components/dashboard/OverviewSection";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import DebtsSection from "@/components/dashboard/DebtsSection";
import GoalsSection from "@/components/dashboard/GoalsSection";

// Mock data based on onboarding flow
const mockData = {
  currency: "USD",
  monthlyIncome: 5000,
  monthlyExpenses: 3200,
  totalDebts: 15000,
  totalInstallments: 800,
  expenses: [
    { name: "Rent", amount: 1200, isMandatory: true, category: "Housing" },
    { name: "Groceries", amount: 400, isMandatory: true, category: "Food" },
    {
      name: "Utilities",
      amount: 200,
      isMandatory: true,
      category: "Utilities",
    },
    {
      name: "Netflix",
      amount: 15,
      isMandatory: false,
      category: "Entertainment",
    },
    { name: "Gym", amount: 50, isMandatory: false, category: "Health" },
  ],
  debts: [
    { name: "Student Loan", balance: 8000, interestRate: 4.5, minPayment: 200 },
    { name: "Credit Card", balance: 5000, interestRate: 18.9, minPayment: 150 },
    { name: "Car Loan", balance: 2000, interestRate: 6.2, minPayment: 100 },
  ],
  installments: [
    {
      name: "iPhone",
      totalAmount: 1200,
      monthlyPayment: 50,
      remainingPayments: 20,
    },
    {
      name: "Furniture",
      totalAmount: 600,
      monthlyPayment: 30,
      remainingPayments: 18,
    },
  ],
  monthlyTrend: [
    { month: "Jan", income: 5000, expenses: 3200, savings: 1800 },
    { month: "Feb", income: 5000, expenses: 3400, savings: 1600 },
    { month: "Mar", income: 5000, expenses: 3100, savings: 1900 },
    { month: "Apr", income: 5000, expenses: 3300, savings: 1700 },
    { month: "May", income: 5000, expenses: 3200, savings: 1800 },
    { month: "Jun", income: 5000, expenses: 3000, savings: 2000 },
  ],
  expenseCategories: [
    { name: "Housing", value: 1200, color: "#8884d8" },
    { name: "Food", value: 600, color: "#82ca9d" },
    { name: "Utilities", value: 200, color: "#ffc658" },
    { name: "Transport", value: 300, color: "#ff7300" },
    { name: "Insurance", value: 200, color: "#00ff00" },
    { name: "Entertainment", value: 165, color: "#ff00ff" },
    { name: "Other", value: 335, color: "#00ffff" },
  ],
};

export default function Dashboard() {
  const [showSensitiveData, setShowSensitiveData] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const [data] = useState(mockData);

  const formatCurrency = (amount: number) => {
    const symbol =
      data.currency === "USD"
        ? "$"
        : data.currency === "EUR"
        ? "€"
        : data.currency === "UAH"
        ? "₴"
        : data.currency;
    return `${symbol}${amount.toLocaleString()}`;
  };

  const getFinancialHealthColor = (ratio: number) => {
    if (ratio < 20) return "text-green-600";
    if (ratio < 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getFinancialHealthBadge = (ratio: number) => {
    if (ratio < 20)
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
          Excellent
        </span>
      );
    if (ratio < 40)
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
          Good
        </span>
      );
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
        Needs Attention
      </span>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <OverviewSection
            data={data}
            showSensitiveData={showSensitiveData}
            formatCurrency={formatCurrency}
            getFinancialHealthColor={getFinancialHealthColor}
            getFinancialHealthBadge={getFinancialHealthBadge}
          />
        );
      case "analytics":
        return <AnalyticsSection data={data} formatCurrency={formatCurrency} />;
      case "debts":
        return (
          <DebtsSection
            data={data}
            showSensitiveData={showSensitiveData}
            formatCurrency={formatCurrency}
          />
        );
      case "goals":
        return (
          <GoalsSection
            data={data}
            showSensitiveData={showSensitiveData}
            formatCurrency={formatCurrency}
          />
        );
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Section Coming Soon
            </h3>
            <p className="text-gray-600">
              This section is under development and will be available soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h1>
              <p className="text-gray-600">
                {activeSection === "overview" &&
                  "Welcome back! Here's your financial overview."}
                {activeSection === "analytics" &&
                  "Detailed insights and analytics for your finances."}
                {activeSection === "debts" &&
                  "Manage and track your debt payments."}
                {activeSection === "goals" &&
                  "Set and track your financial goals."}
                {!["overview", "analytics", "debts", "goals"].includes(
                  activeSection
                ) && "Manage your finances."}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSensitiveData(!showSensitiveData)}
                className="inline-flex items-center justify-center rounded-md h-9 px-3 border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium"
              >
                {showSensitiveData ? (
                  <EyeOff className="h-4 w-4 mr-2" />
                ) : (
                  <Eye className="h-4 w-4 mr-2" />
                )}
                {showSensitiveData ? "Hide" : "Show"} Details
              </button>
              <button className="inline-flex items-center justify-center rounded-md h-9 px-3 bg-gray-900 text-white hover:bg-gray-800 text-sm font-medium">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">{renderSection()}</div>
      </div>
    </div>
  );
}
