import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AnalyticsSectionProps {
  data: any;
  formatCurrency: (amount: number) => string;
}

export default function AnalyticsSection({
  data,
  formatCurrency,
}: AnalyticsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Monthly Cash Flow</h3>
            <p className="text-sm text-gray-600">
              Income vs Expenses over the last 6 months
            </p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Expenses"
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Categories Pie Chart */}
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Expense Breakdown</h3>
            <p className="text-sm text-gray-600">
              Where your money goes each month
            </p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.expenseCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.expenseCategories.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {data.expenseCategories.map((category: any, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm">{category.name}</span>
                <span className="text-sm font-medium ml-auto">
                  {formatCurrency(category.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Health Score */}
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <span className="text-green-600">●</span>
              <span>Financial Health</span>
            </h3>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                78/100
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-900 h-2 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Good financial health
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Emergency Fund</span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                  Complete
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Debt Management</span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                  In Progress
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Savings Rate</span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                  Good
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Spending Trends */}
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Spending Trends</h3>
            <p className="text-sm text-gray-600">Monthly spending patterns</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="font-medium">$3,200</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Month</span>
              <span className="font-medium">$3,400</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average</span>
              <span className="font-medium">$3,250</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Change</span>
                <span className="text-sm text-green-600 font-medium">
                  -5.9%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Budget Progress</h3>
            <p className="text-sm text-gray-600">Monthly budget status</p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Housing</span>
                <span>$1,200 / $1,200</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Food</span>
                <span>$400 / $500</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Entertainment</span>
                <span>$165 / $200</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
