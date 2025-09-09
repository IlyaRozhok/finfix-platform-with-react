import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react";

interface OverviewSectionProps {
  data: any;
  showSensitiveData: boolean;
  formatCurrency: (amount: number) => string;
  getFinancialHealthColor: (ratio: number) => string;
  getFinancialHealthBadge: (ratio: number) => React.ReactElement;
}

export default function OverviewSection({
  data,
  showSensitiveData,
  formatCurrency,
  getFinancialHealthColor,
  getFinancialHealthBadge,
}: OverviewSectionProps) {
  const netWorth = data.monthlyIncome - data.monthlyExpenses;
  const savingsRate = ((netWorth / data.monthlyIncome) * 100).toFixed(1);
  const debtToIncomeRatio = (
    (data.totalDebts / data.monthlyIncome) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Monthly Income</h3>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {showSensitiveData ? formatCurrency(data.monthlyIncome) : "••••"}
            </div>
            <p className="text-xs text-gray-500">+2.5% from last month</p>
          </div>
        </div>

        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Monthly Expenses</h3>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {showSensitiveData
                ? formatCurrency(data.monthlyExpenses)
                : "••••"}
            </div>
            <p className="text-xs text-gray-500">-1.2% from last month</p>
          </div>
        </div>

        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Net Worth</h3>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div
              className={`text-2xl font-bold ${
                netWorth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {showSensitiveData ? formatCurrency(netWorth) : "••••"}
            </div>
            <p className="text-xs text-gray-500">{savingsRate}% savings rate</p>
          </div>
        </div>

        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Debt-to-Income</h3>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <div
              className={`text-2xl font-bold ${getFinancialHealthColor(
                parseFloat(debtToIncomeRatio)
              )}`}
            >
              {showSensitiveData ? `${debtToIncomeRatio}%` : "•••"}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              {getFinancialHealthBadge(parseFloat(debtToIncomeRatio))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="rounded-lg border bg-white shadow-sm p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <p className="text-sm text-gray-600">
            Your latest financial activity
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              name: "Salary Deposit",
              amount: 5000,
              type: "income",
              date: "Mar 1, 2024",
            },
            {
              name: "Rent Payment",
              amount: -1200,
              type: "expense",
              date: "Mar 1, 2024",
            },
            {
              name: "Grocery Store",
              amount: -150,
              type: "expense",
              date: "Feb 28, 2024",
            },
            {
              name: "Freelance Payment",
              amount: 800,
              type: "income",
              date: "Feb 27, 2024",
            },
            {
              name: "Netflix Subscription",
              amount: -15,
              type: "expense",
              date: "Feb 26, 2024",
            },
          ].map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    transaction.type === "income"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
                <div>
                  <p className="font-medium text-sm">{transaction.name}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div
                className={`font-medium ${
                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {formatCurrency(Math.abs(transaction.amount))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
