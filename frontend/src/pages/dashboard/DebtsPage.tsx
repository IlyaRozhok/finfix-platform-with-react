import React, { useEffect, useState } from "react";
import { fetchUserDebts } from "@/features/debts/api";
import { Debt } from "@/entities/debts/model";
import { SparklesIcon } from "@heroicons/react/24/outline";

export function DebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDebts = async () => {
      try {
        setLoading(true);
        const data = await fetchUserDebts();
        setDebts(data);
      } catch (err) {
        console.error("Failed to load debts:", err);
        setError("Failed to load debts");
      } finally {
        setLoading(false);
      }
    };

    loadDebts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black/70">Loading debts...</div>
      </div>
    );
  }

  if (error || !debts) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-300">{error || "Failed to load debts"}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Debts</h1>
        <p className="mt-1">Manage your debt obligations</p>
      </div>

      {/* Debts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {debts.length === 0 ? (
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
                No debts yet
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-disable leading-relaxed">
                Your debt information will appear here once you add some loans
                or credit cards.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Debt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {debts.map((debt) => (
                  <tr key={debt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {debt.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {debt.debtType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${parseFloat(debt.totalDebt || "0").toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${parseFloat(debt.monthlyPayment || "0").toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parseFloat(debt.interest || "0").toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          debt.isClosed
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {debt.isClosed ? "Closed" : "Active"}
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
