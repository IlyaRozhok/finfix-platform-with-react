import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import LogoutButton from "@/features/auth/logout/LogoutButton";
import { CloseButton } from "@/shared/ui";

const getPageTitle = (pathname: string): string => {
  const pathMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/transactions": "Transactions",
    "/dashboard/debts": "Debts",
    "/dashboard/installments": "Installments",
    "/dashboard/expenses": "Expenses",
    "/dashboard/settings": "Settings",
  };

  return pathMap[pathname] || "Dashboard";
};

export const DashboardHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header
      className="h-16 px-6 flex items-center justify-between"
      style={{
        backgroundColor: "#01030A",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-white">{pageTitle}</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center space-x-2 p-2 rounded-full transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")
          }
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
              {user?.userName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
          {!isMenuOpen && (
            <span className="text-sm text-white/80">{user?.userName}</span>
          )}
        </button>

        {isMenuOpen && (
          <div
            className="absolute right-0 top-12 w-64 rounded-lg shadow-lg p-4 z-50"
            style={{
              backgroundColor: "rgba(1, 3, 10, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {user?.userName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-white">
                    {user?.userName}
                  </p>
                  <p className="text-xs text-white/60">{user?.email}</p>
                </div>
              </div>
              <CloseButton handleClose={() => setIsMenuOpen(false)} />
            </div>
            <div
              className="pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
