import React, { useEffect, useState } from "react";
import { fetchAccounts, Account, AccountType, AccountAssetType, AccountProvider } from "@/features/accounts/api";
import { AccountForm } from "@/features/accounts/ui/AccountForm";
import { Button, useToast } from "@/shared/ui";
import { useAuth } from "@/app/providers/AuthProvider";

export function AccountsPage() {
  const { addToast } = useToast();
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAccounts();
      setAccounts(data);
    } catch (err: any) {
      console.error("Failed to load accounts:", err);
      // Handle 404 as empty list (backend throws NotFoundException when no accounts)
      if (err?.response?.status === 404) {
        setAccounts([]);
      } else {
        setError("Failed to load accounts");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleCreateAccount = async () => {
    await loadAccounts();
  };

  const openAddForm = () => {
    setShowForm(true);
  };

  const formatAccountType = (type: AccountType) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const formatAssetType = (assetType: AccountAssetType) => {
    return assetType.charAt(0).toUpperCase() + assetType.slice(1);
  };

  const formatProvider = (provider: AccountProvider) => {
    return provider.charAt(0).toUpperCase() + provider.slice(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black/70">Loading accounts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="mt-1">Manage your financial accounts</p>
        </div>
        <Button variant="glass-primary" onClick={openAddForm}>
          Add Account
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 backdrop-blur-md rounded-2xl border border-red-500/20 shadow-lg p-4">
          <div className="text-sm text-red-400">{error}</div>
        </div>
      )}

      {/* Accounts Table */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        {accounts.length === 0 ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              {/* Title */}
              <h3 className="text-xl font-semibold text-primary-background mb-3">
                No accounts yet
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-disable leading-relaxed">
                Your account information will appear here once you add some
                accounts.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5 backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    External ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-white/10">
                {accounts.map((account) => (
                  <tr
                    key={account.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {account.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {account.description || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatAccountType(account.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatAssetType(account.assetType)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {account.assetCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatProvider(account.provider)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.externalId || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Account Form Modal */}
      <AccountForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
        }}
        onSubmit={handleCreateAccount}
        isEditing={false}
        userId={user?.id ?? ""}
      />
    </div>
  );
}
