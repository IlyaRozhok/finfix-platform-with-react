import React, { useEffect, useMemo, useState } from "react";
import { TransactionForm } from "@/features/transactions";
import { Button } from "@/shared/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export function TransactionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for consistency with other pages
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleAddTransaction = () => {
    setShowForm(true);
  };

  const refreshTransactions = async () => {
    // For now, just a placeholder. In a full implementation, this would refresh the transaction list
    // Since we're only creating transactions currently, we might not need to fetch them
    // This could be expanded later to show transaction history
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black/70">Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="mt-1">Record your financial transactions</p>
        </div>
        <Button variant="glass-primary" onClick={handleAddTransaction}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Content */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <h3 className="text-xl font-semibold text-primary-background mb-3">
              Transaction History
            </h3>
            <p className="text-sm text-disable leading-relaxed">
              Your transaction history will appear here. Use the "Add Transaction" button to record new transactions.
            </p>
          </div>
        </div>
      </div>

      <TransactionForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={refreshTransactions}
      />
    </div>
  );
}
