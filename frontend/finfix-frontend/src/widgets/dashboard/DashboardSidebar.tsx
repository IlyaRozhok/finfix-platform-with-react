import React from "react";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import {
  ChartBarIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ReceiptRefundIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Transactions", href: "/transactions", icon: ChartBarIcon },
  { name: "Debts", href: "/debts", icon: CreditCardIcon },
  { name: "Installments", href: "/installments", icon: ReceiptRefundIcon },
  { name: "Expenses", href: "/expenses", icon: CurrencyDollarIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Finfix</h2>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={clsx(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

