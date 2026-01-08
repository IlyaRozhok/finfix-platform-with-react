import React, { useEffect, useState } from "react";
import { TransactionForm } from "@/features/transactions";
import { Button, useToast } from "@/shared/ui";
import { ConfirmationModal } from "@/shared/ui/ConfirmationModal";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  TrashIcon,
  TagIcon,
  CreditCardIcon,
  BanknotesIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  fetchTransactions,
  deleteTransaction,
  Transaction,
} from "@/features/transactions/api";

export function TransactionsPage() {
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      setError("Failed to load transactions");
      console.warn(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = () => {
    setShowForm(true);
  };

  const refreshTransactions = async () => {
    await loadTransactions();
  };

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
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatAmount = (amount: string, direction: string) => {
    const formatted = parseFloat(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return direction === "income" ? `+$${formatted}` : `-$${formatted}`;
  };

  const getTransactionType = (type: string) => {
    switch (type) {
      case "category_based":
        return "Category";
      case "installment_payment":
        return "Installment";
      case "debt_payment":
        return "Debt Payment";
      case "transfer":
        return "Transfer";
      case "income_regular":
        return "Regular Income";
      case "income_event":
        return "Event Income";
      default:
        return type;
    }
  };

  const getTransactionDescription = (transaction: Transaction) => {
    const typeLabel = getTransactionType(transaction.type);
    const amount = formatAmount(transaction.amount, transaction.direction);
    return `${typeLabel} - ${amount}`;
  };

  const getRelatedEntityInfo = (transaction: Transaction) => {
    if (transaction.category) {
      return {
        type: "category",
        label: transaction.category.name,
        icon: TagIcon,
      };
    }
    if (transaction.installment) {
      return {
        type: "installment",
        label: transaction.installment.description,
        icon: CreditCardIcon,
      };
    }
    if (transaction.debt) {
      return {
        type: "debt",
        label: transaction.debt.description,
        icon: BanknotesIcon,
      };
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black/70">Loading transactions...</div>
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
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Transactions</h1>
          <p className="mt-1 text-sm sm:text-base">Record and manage your financial transactions</p>
        </div>

        <div className="w-full sm:w-auto">
          <Button variant="glass-primary" onClick={handleAddTransaction} className="w-full sm:w-auto">
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {transactions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-primary-background/60 mb-1">Total Transactions</div>
            <div className="text-xl sm:text-2xl font-bold text-primary-background/90">
              {transactions.length}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-primary-background/60 mb-1">Total Income</div>
            <div className="text-xl sm:text-2xl font-bold text-primary-background/90">
              {formatAmount(
                transactions
                  .filter((t) => t.direction === "income")
                  .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                  .toString(),
                "income"
              )}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-primary-background/60 mb-1">Total Expenses</div>
            <div className="text-xl sm:text-2xl font-bold text-primary-background/90">
              {formatAmount(
                transactions
                  .filter((t) => t.direction === "expense")
                  .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                  .toString(),
                "expense"
              )}
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table / Cards */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 shadow-lg overflow-hidden">
        {transactions.length === 0 ? (
          <div className="min-h-[300px] flex items-center justify-center p-4 sm:p-8">
            <div className="text-center max-w-md mx-auto">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-background mb-2 sm:mb-3">
                No transactions yet
              </h3>
              <p className="text-xs sm:text-sm text-disable leading-relaxed">
                Your transaction history will appear here. Use the "Add
                Transaction" button to record new transactions.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/3 backdrop-blur-sm">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-primary-background/50 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-primary-background/50 uppercase tracking-wider">
                      Type & Direction
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-primary-background/50 uppercase tracking-wider">
                      Category / Related
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-primary-background/50 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-primary-background/50 uppercase tracking-wider">
                      Account
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-primary-background/50 uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-primary-background/50 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-white/10">
                  {transactions.map((transaction) => {
                    const relatedInfo = getRelatedEntityInfo(transaction);
                    const RelatedIcon = relatedInfo?.icon || DocumentTextIcon;

                    return (
                      <tr
                        key={transaction.id}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-primary-background/80 font-medium">
                            {formatDateShort(transaction.occurredAt)}
                          </div>
                          <div className="text-xs text-primary-background/50">
                            {new Date(transaction.occurredAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center bg-white/10`}
                              >
                                {transaction.direction === "income" ? (
                                  <ArrowTrendingUpIcon className="h-4 w-4 text-primary-background/60" />
                                ) : (
                                  <ArrowTrendingDownIcon className="h-4 w-4 text-primary-background/60" />
                                )}
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-primary-background/80">
                                {getTransactionType(transaction.type)}
                              </div>
                              <span
                                className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full mt-1 bg-white/10 text-primary-background/70`}
                              >
                                {transaction.direction === "income"
                                  ? "Income"
                                  : "Expense"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          {relatedInfo ? (
                            <div className="flex items-center space-x-2">
                              <RelatedIcon className="h-4 w-4 text-primary-background/40 flex-shrink-0" />
                              <span className="text-sm text-primary-background/80 truncate max-w-xs">
                                {relatedInfo.label}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-primary-background/50">—</span>
                          )}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm font-semibold text-primary-background/80`}
                          >
                            {formatAmount(
                              transaction.amount,
                              transaction.direction
                            )}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          {transaction.account ? (
                            <div className="flex items-center space-x-2">
                              <CreditCardIcon className="h-4 w-4 text-primary-background/40" />
                              <div>
                                <div className="text-sm text-primary-background/80">
                                  {transaction.account.name}
                                </div>
                                <div className="text-xs text-primary-background/50">
                                  {transaction.account.assetCode}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-primary-background/50">—</span>
                          )}
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-sm text-primary-background/80 max-w-xs">
                          {transaction.note ? (
                            <div className="truncate" title={transaction.note}>
                              {transaction.note}
                            </div>
                          ) : (
                            <span className="text-primary-background/50">—</span>
                          )}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteTransaction(transaction)}
                            className="text-primary-background/50 hover:text-primary-background/70 p-1 rounded-lg hover:bg-white/10 transition-all duration-200"
                            title="Delete transaction"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-white/10">
              {transactions.map((transaction) => {
                const relatedInfo = getRelatedEntityInfo(transaction);
                const RelatedIcon = relatedInfo?.icon || DocumentTextIcon;

                return (
                  <div
                    key={transaction.id}
                    className="p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10">
                            {transaction.direction === "income" ? (
                              <ArrowTrendingUpIcon className="h-5 w-5 text-primary-background/60" />
                            ) : (
                              <ArrowTrendingDownIcon className="h-5 w-5 text-primary-background/60" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-primary-background/80">
                              {getTransactionType(transaction.type)}
                            </span>
                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-white/10 text-primary-background/70">
                              {transaction.direction === "income" ? "Income" : "Expense"}
                            </span>
                          </div>
                          <div className="text-xs text-primary-background/50">
                            {formatDateShort(transaction.occurredAt)} • {new Date(transaction.occurredAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteTransaction(transaction)}
                          className="text-primary-background/50 hover:text-primary-background/70 p-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 flex-shrink-0"
                          title="Delete transaction"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary-background/60">Amount</span>
                        <span className="text-base font-semibold text-primary-background/80">
                          {formatAmount(transaction.amount, transaction.direction)}
                        </span>
                      </div>
                      
                      {relatedInfo && (
                        <div className="flex items-center space-x-2">
                          <RelatedIcon className="h-3.5 w-3.5 text-primary-background/40 flex-shrink-0" />
                          <span className="text-xs text-primary-background/70 truncate">
                            {relatedInfo.label}
                          </span>
                        </div>
                      )}
                      
                      {transaction.account && (
                        <div className="flex items-center space-x-2">
                          <CreditCardIcon className="h-3.5 w-3.5 text-primary-background/40 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-primary-background/70 truncate">
                              {transaction.account.name}
                            </div>
                            <div className="text-xs text-primary-background/50">
                              {transaction.account.assetCode}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {transaction.note && (
                        <div className="pt-1 border-t border-white/10">
                          <div className="text-xs text-primary-background/60 mb-0.5">Note</div>
                          <div className="text-xs text-primary-background/70">{transaction.note}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <TransactionForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={refreshTransactions}
      />

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
