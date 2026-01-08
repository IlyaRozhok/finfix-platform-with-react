import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button, useToast } from "@/shared/ui";
import { ConfirmationModal } from "@/shared/ui/ConfirmationModal";
import {
  fetchTransactions,
  deleteTransaction,
  Transaction,
} from "@/features/transactions/api";

interface TransactionsFeedProps {
  onAddTransaction?: () => void;
}

export function TransactionsFeed({ onAddTransaction }: TransactionsFeedProps) {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    description: string;
  } | null>(null);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await fetchTransactions();
      // Take only the latest 5 transactions for the feed
      setTransactions(data.slice(0, 5));
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDeleteTransaction = (transaction: Transaction) => {
    const description = getTransactionDescription(transaction);
    setDeleteTarget({ id: transaction.id, description });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteTransaction(deleteTarget.id);
      addToast(
        "success",
        "Transaction deleted",
        "Transaction removed successfully."
      );
      await loadTransactions();
    } catch (err) {
      console.error("Failed to delete transaction:", err);
      addToast("error", "Delete failed", "Please try again.");
    } finally {
      setShowDeleteModal(false);
      setDeleteTarget(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: string, direction: string) => {
    const formatted = parseFloat(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return direction === "income" ? `+$${formatted}` : `-$${formatted}`;
  };

  const getTransactionDescription = (transaction: Transaction) => {
    switch (transaction.type) {
      case "category_based":
        return "Category Transaction";
      case "installment_payment":
        return "Installment Payment";
      case "debt_payment":
        return "Debt Payment";
      case "transfer":
        return "Transfer";
      case "income_regular":
        return "Regular Income";
      case "income_event":
        return "Event Income";
      default:
        return "Transaction";
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-background">
            Recent Transactions
          </h3>
          <div className="w-20 h-8 bg-white/10 animate-pulse rounded-xl"></div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/10 animate-pulse rounded-full"></div>
                <div className="space-y-1">
                  <div className="w-32 h-4 bg-white/10 animate-pulse rounded"></div>
                  <div className="w-20 h-3 bg-white/10 animate-pulse rounded"></div>
                </div>
              </div>
              <div className="w-16 h-4 bg-white/10 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-background">
            Recent Transactions
          </h3>
          <Button variant="ghost" size="sm" onClick={onAddTransaction}>
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-center h-32">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 shadow-lg p-3 sm:p-4 lg:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-primary-background">
          Recent Transactions
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard/transactions")}
          className="flex-shrink-0"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-24 sm:h-32 text-center p-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
            <ArrowTrendingUpIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-background/50" />
          </div>
          <p className="text-xs sm:text-sm text-primary-background/70 mb-1 sm:mb-2">
            No transactions yet
          </p>
          <p className="text-xs text-primary-background/50">
            Your recent transactions will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-2 sm:p-3 bg-white/5 rounded-lg sm:rounded-xl hover:bg-white/10 transition-colors gap-2"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10`}
                >
                  {transaction.direction === "income" ? (
                    <ArrowTrendingUpIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-background/60" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-background/60" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-primary-background truncate">
                    {getTransactionDescription(transaction)}
                  </p>
                  <p className="text-xs text-primary-background/60">
                    {formatDate(transaction.occurredAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
                <div
                  className={`text-xs sm:text-sm font-semibold text-primary-background/80`}
                >
                  {formatAmount(transaction.amount, transaction.direction)}
                </div>
                <button
                  onClick={() => handleDeleteTransaction(transaction)}
                  className="p-1 rounded-lg text-primary-background/50 hover:text-primary-background/70 hover:bg-white/10 transition-all duration-200"
                  title="Delete transaction"
                >
                  <TrashIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteModal && deleteTarget && (
        <ConfirmationModal
          title={`Are you sure you want to delete "${deleteTarget.description}"?`}
          action={confirmDelete}
          cancel={cancelDelete}
        />
      )}
    </div>
  );
}
