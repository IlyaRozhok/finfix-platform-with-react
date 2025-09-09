import { CreditCard, AlertTriangle } from "lucide-react";

interface DebtsSectionProps {
  data: any;
  showSensitiveData: boolean;
  formatCurrency: (amount: number) => string;
}

export default function DebtsSection({
  data,
  showSensitiveData,
  formatCurrency,
}: DebtsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Debt Overview */}
      <div className="rounded-lg border bg-white shadow-sm p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-orange-600" />
            <span>Debt Overview</span>
          </h3>
        </div>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {showSensitiveData ? formatCurrency(data.totalDebts) : "••••"}
            </div>
            <p className="text-sm text-gray-500">Total Outstanding</p>
          </div>

          <div className="space-y-3">
            {data.debts.map((debt: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-sm">{debt.name}</h4>
                      {debt.interestRate > 15 && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {debt.interestRate}% APR
                    </p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Balance:</span>
                      <span className="font-medium">
                        {showSensitiveData
                          ? formatCurrency(debt.balance)
                          : "••••"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Min Payment:</span>
                      <span className="font-medium">
                        {formatCurrency(debt.minPayment)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Monthly Payment</span>
                    <span>Due Date</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{formatCurrency(debt.minPayment)}</span>
                    <span>15th of each month</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Debt Payoff Strategy */}
      <div className="rounded-lg border bg-white shadow-sm p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Payoff Strategy</h3>
          <p className="text-sm text-gray-600">
            Recommended debt payment approach
          </p>
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-blue-900">
                  Pay High-Interest First
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Focus on the Credit Card (18.9% APR) to minimize interest
                  payments
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-green-900">Student Loan</h4>
                <p className="text-sm text-green-700 mt-1">
                  Continue minimum payments (4.5% APR is relatively low)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-yellow-900">Car Loan</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Pay off last (6.2% APR is moderate)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Calculator */}
      <div className="rounded-lg border bg-white shadow-sm p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Payment Calculator</h3>
          <p className="text-sm text-gray-600">
            See how extra payments affect payoff time
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extra Monthly Payment
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Debt
              </label>
              <select className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-500">
                <option>Credit Card</option>
                <option>Student Loan</option>
                <option>Car Loan</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Current Payoff Time:</span>
                <span className="font-medium ml-2">24 months</span>
              </div>
              <div>
                <span className="text-gray-600">With Extra Payment:</span>
                <span className="font-medium ml-2 text-green-600">
                  18 months
                </span>
              </div>
              <div>
                <span className="text-gray-600">Interest Saved:</span>
                <span className="font-medium ml-2 text-green-600">$1,200</span>
              </div>
              <div>
                <span className="text-gray-600">Total Savings:</span>
                <span className="font-medium ml-2 text-green-600">$1,200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
