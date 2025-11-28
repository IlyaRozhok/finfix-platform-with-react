import React, { useEffect, useState, useMemo } from "react";
import { fetchAllIncomes } from "@/features/incomes/api";
import { AllIncomes } from "@/features/incomes/model/types";
import { IncomeForm } from "@/features/incomes/ui/IncomeForm";
import { Button } from "@/shared/ui/Button";
import {
  SparklesIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export function IncomesPage() {
  const [incomes, setIncomes] = useState<AllIncomes>({
    regular: [],
    events: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"regular" | "event">("regular");

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const regularTotal = incomes.regular.reduce(
      (sum, income) => sum + income.amount,
      0
    );
    const eventTotal = incomes.events.reduce(
      (sum, income) => sum + income.amount,
      0
    );
    const totalAmount = regularTotal + eventTotal;

    return {
      regularTotal,
      eventTotal,
      totalAmount,
      regularCount: incomes.regular.length,
      eventCount: incomes.events.length,
    };
  }, [incomes]);

  const handleCreateIncome = async () => {
    // Reload data after successful creation
    try {
      const data = await fetchAllIncomes();
      setIncomes(data);
    } catch (err) {
      console.error("Failed to reload incomes:", err);
      throw err; // Re-throw so the form can handle the error
    }
  };

  const openForm = (type: "regular" | "event") => {
    setFormType(type);
    setShowForm(true);
  };

  useEffect(() => {
    const loadIncomes = async () => {
      try {
        setLoading(true);
        const data = await fetchAllIncomes();
        setIncomes(data);
      } catch (err) {
        console.error("Failed to load incomes:", err);
        setError("Failed to load incomes");
      } finally {
        setLoading(false);
      }
    };

    loadIncomes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black/70">Loading incomes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-300">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Incomes</h1>
        <p className="mt-1">Track your income sources</p>
      </div>

      {/* Summary Cards */}
      {(incomes.regular.length > 0 || incomes.events.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-background">
                  Total Monthly
                </p>
                <p className="text-2xl font-bold mt-1 text-primary-background">
                  ${summaryStats.regularTotal.toLocaleString()}
                </p>
              </div>
              <div className="text-2xl text-primary-background/80">
                <CurrencyDollarIcon className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-background">
                  Event Income
                </p>
                <p className="text-2xl font-bold mt-1 text-primary-background">
                  ${summaryStats.eventTotal.toLocaleString()}
                </p>
              </div>
              <div className="text-2xl text-primary-background/80">
                <CalendarDaysIcon className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-background">
                  Total Income
                </p>
                <p className="text-2xl font-bold mt-1 text-primary-background">
                  ${summaryStats.totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-2xl text-primary-background/80">
                <SparklesIcon className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Incomes Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary-background">
            Regular Incomes ({summaryStats.regularCount})
          </h2>
          <Button variant="glass-primary" onClick={() => openForm("regular")}>
            Add Regular Income
          </Button>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden">
          {incomes.regular.length === 0 ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="text-center max-w-md mx-auto p-8">
                <h3 className="text-lg font-semibold text-primary-background mb-2">
                  No regular incomes yet
                </h3>
                <p className="text-sm text-disable leading-relaxed">
                  Your regular income sources will appear here once you add
                  some.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Added
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-white/10">
                  {incomes.regular.map((income) => (
                    <tr
                      key={income.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {income.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${income.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">per month</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(income.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Event Incomes Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary-background">
            Event Incomes ({summaryStats.eventCount})
          </h2>
          <Button variant="glass-secondary" onClick={() => openForm("event")}>
            Add Event Income
          </Button>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden">
          {incomes.events.length === 0 ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="text-center max-w-md mx-auto p-8">
                <h3 className="text-lg font-semibold text-primary-background mb-2">
                  No event incomes yet
                </h3>
                <p className="text-sm text-disable leading-relaxed">
                  Your one-time income events will appear here once you add
                  some.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-white/10">
                  {incomes.events.map((income) => (
                    <tr
                      key={income.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {income.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${income.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(income.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Income Form Modal */}
      <IncomeForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleCreateIncome}
        type={formType}
      />
    </div>
  );
}
