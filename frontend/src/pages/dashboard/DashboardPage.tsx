import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { fetchDashboardStats } from "@/features/dashboard/api";
import { DashboardStats } from "@/features/dashboard/model/types";
import { OverviewWidget } from "@/widgets/dashboard/OverviewWidget";
import { ThreePieChart } from "@/widgets/dashboard/ThreePieChart";
import { CategoriesBarChart } from "@/widgets/dashboard/CategoriesBarChart";
import { InstallmentsWidget } from "@/widgets/dashboard/InstallmentsWidget";
import { TransactionsFeed } from "@/widgets/dashboard/TransactionsFeed";
import { DashboardSkeleton } from "@/shared/ui";
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

export function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-300">{error || "Failed to load data"}</div>
      </div>
    );
  }

  // Calculate total expenses
  const totalExpenses = stats.expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-0">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          Welcome back, {user?.userName ?? user?.email}
        </h1>
        <p className="mt-1 text-sm sm:text-base">Here you can see your financial overview</p>
      </div>

      {/* Monthly Overview Widgets */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Monthly Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <OverviewWidget
            title="Total Income"
            value={stats.incomes}
            icon={<ArrowTrendingUpIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
          />
          <OverviewWidget
            title="Total Expenses"
            value={totalExpenses}
            icon={<CurrencyDollarIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
          />
          <OverviewWidget
            title="Net Worth"
            value={stats.monthlyNetworth}
            icon={<BanknotesIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
          />
          <OverviewWidget
            title="Monthly Obligations"
            value={stats.monthlyObligations}
            icon={<BanknotesIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
          />
        </div>
      </div>

      {/* Charts & Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white/5 backdrop-blur-md p-2 sm:p-3 rounded-xl border border-white/10 shadow-lg">
          <h3 className="text-xs sm:text-sm font-semibold text-primary-background mb-2 sm:mb-3 text-center">
            Expense Transactions
          </h3>
          <ThreePieChart
            expenses={[]}
            expenseTransactions={stats.expenseTransactions}
          />
        </div>
        <div className="bg-white/5 backdrop-blur-md p-2 sm:p-3 rounded-xl border border-white/10 shadow-lg">
          <h3 className="text-xs sm:text-sm font-semibold text-primary-background mb-2 sm:mb-3 text-center">
            Expenses by Category
          </h3>
          <CategoriesBarChart
            expenses={[]}
            expenseTransactions={stats.expenseTransactions}
          />
        </div>
      </div>

      {/* Installments Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <InstallmentsWidget installments={stats.installments} />
      </div>

      {/* Transactions Feed */}
      <div className="w-full">
        <TransactionsFeed />
      </div>
    </div>
  );
}
