import React, { useEffect, useState } from "react";
import {
  fetchClientInfo,
  fetchTransactions,
  ClientInfo,
  MonoAccount,
  MonoTransaction,
} from "@features/monobank";
import { AccountCard, TransactionsList } from "@features/monobank";

const Monobank = () => {
  const [monoClientInfo, setMonoClientInfo] = useState<ClientInfo | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<MonoAccount | null>(
    null
  );
  const [transactions, setTransactions] = useState<MonoTransaction[]>([]);
  const [isLoadingClient, setIsLoadingClient] = useState(true);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getClient = async () => {
    try {
      setIsLoadingClient(true);
      setError(null);
      const clientInfo = await fetchClientInfo();
      setMonoClientInfo(clientInfo);
    } catch (err) {
      console.error("Failed to fetch client info", err);
      setError("Failed to load client information");
    } finally {
      setIsLoadingClient(false);
    }
  };

  const loadTransactions = async (account: MonoAccount) => {
    if (!account) return;

    try {
      setIsLoadingTransactions(true);
      setError(null);

      const now = Math.floor(Date.now() / 1000);
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60;

      const transactionsData = await fetchTransactions(
        account.id,
        thirtyDaysAgo,
        now
      );
      setTransactions(transactionsData);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
      setError("Failed to load transactions");
      setTransactions([]);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const handleAccountClick = (account: MonoAccount) => {
    setSelectedAccount(account);
    loadTransactions(account);
  };

  useEffect(() => {
    getClient();
  }, []);

  if (isLoadingClient) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Monobank</h1>
            <p className="mt-1">Observe your monobank client info</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6">
          <div className="text-center text-gray-400">
            Loading client information...
          </div>
        </div>
      </div>
    );
  }

  if (error && !monoClientInfo) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Monobank</h1>
            <p className="mt-1">Observe your monobank client info</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6">
          <div className="text-center text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Monobank</h1>
          <p className="mt-1">Observe your monobank client info</p>
        </div>
      </div>

      {monoClientInfo && (
        <>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6">
            <h2 className="text-xl font-semibold text-primary-background mb-2">
              {monoClientInfo.name}
            </h2>
            <p className="text-sm text-gray-400">
              {monoClientInfo.accounts.length} account
              {monoClientInfo.accounts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {monoClientInfo.accounts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-primary-background mb-4">
                Accounts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monoClientInfo.accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    isSelected={selectedAccount?.id === account.id}
                    onClick={() => handleAccountClick(account)}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedAccount && (
            <div>
              <h3 className="text-lg font-semibold text-primary-background mb-4">
                Transactions
              </h3>
              <TransactionsList
                transactions={transactions}
                currencyCode={selectedAccount.currencyCode}
                isLoading={isLoadingTransactions}
              />
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 backdrop-blur-md rounded-2xl border border-red-500/20 shadow-lg p-4">
              <div className="text-sm text-red-400">{error}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Monobank;
