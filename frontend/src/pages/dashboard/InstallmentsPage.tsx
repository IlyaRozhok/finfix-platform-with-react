import React, { useEffect, useState, useMemo } from "react";
import { fetchUserInstallments } from "@/features/installments/api";
import { Installment } from "@/features/installments/model/types";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export function InstallmentsPage() {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate summary statistics (always call this hook, before any returns)
  const summaryStats = useMemo(() => {
    if (!installments || installments.length === 0) {
      return {
        totalAmount: 0,
        monthlyPayment: 0,
        installmentCount: 0,
      };
    }

    const totalAmount = installments.reduce((sum, installment) => sum + installment.totalAmount, 0);
    const monthlyPayment = installments.reduce((sum, installment) => sum + installment.monthlyPayment, 0);

    return {
      totalAmount,
      monthlyPayment,
      installmentCount: installments.length,
    };
  }, [installments]);

  useEffect(() => {
    const loadInstallments = async () => {
      try {
        setLoading(true);
        const data = await fetchUserInstallments();
        setInstallments(data);
      } catch (err) {
        console.error("Failed to load installments:", err);
        setError("Failed to load installments");
      } finally {
        setLoading(false);
      }
    };

    loadInstallments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black/70">Loading installments...</div>
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

  if (!installments) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black/70">Loading installments...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Installments</h1>
        <p className="mt-1">Track your installment plans</p>
      </div>

      {/* Summary Cards */}
      {installments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-background">Total Amount</p>
                <p className="text-2xl font-bold mt-1 text-primary-background">
                  ${summaryStats.totalAmount.toLocaleString()}
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
                <p className="text-sm font-medium text-primary-background">Monthly Payment</p>
                <p className="text-2xl font-bold mt-1 text-primary-background">
                  ${summaryStats.monthlyPayment.toLocaleString()}
                </p>
              </div>
              <div className="text-2xl text-primary-background/80">
                <CalendarDaysIcon className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Installments Table */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        {installments.length === 0 ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <SparklesIcon className="h-8 w-8 text-primary-background/70" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-primary-background mb-2">
                No installments yet
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-disable leading-relaxed">
                Your installment plans will appear here once you add some purchases.
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
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payments Left
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-white/10">
                {installments.map((installment) => (
                  <tr key={installment.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {installment.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ${installment.totalAmount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ${installment.monthlyPayment.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">per month</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {installment.totalPayments}
                      </div>
                      <div className="text-xs text-gray-500">payments</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        {new Date(installment.endDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        installment.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {installment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
