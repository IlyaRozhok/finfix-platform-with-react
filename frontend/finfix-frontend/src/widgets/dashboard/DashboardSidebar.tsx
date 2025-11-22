import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import {
  ChartBarIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ReceiptRefundIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/money-tree.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Transactions", href: "/dashboard/transactions", icon: ChartBarIcon },
  { name: "Debts", href: "/dashboard/debts", icon: CreditCardIcon },
  {
    name: "Installments",
    href: "/dashboard/installments",
    icon: ReceiptRefundIcon,
  },
  { name: "Expenses", href: "/dashboard/expenses", icon: CurrencyDollarIcon },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
];

export function DashboardSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={clsx(
        "flex h-full flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
      style={{
        backgroundColor: "#F9FAFB",
        borderRight: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <div
        className={clsx(
          "flex items-center transition-all duration-300",
          isCollapsed ? "h-16 justify-center px-0" : "h-16 px-6"
        )}
        style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
      >
        {!isCollapsed && (
          <h2 className="text-xl font-semibold text-primary-background flex items-center gap-1">
            <img src={logo} alt="logo" className="w-10" />
            <div>Finfix</div>
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={clsx(
            "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
            isCollapsed ? "ml-0" : "ml-auto"
          )}
          style={{ backgroundColor: "rgba(0,0,0,0.1)", color: "#1F2937" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)")
          }
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-4 w-4 text-primary-background" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4 text-primary-background" />
          )}
        </button>
      </div>
      <nav
        className={clsx(
          "flex-1 space-y-1 py-6 transition-all duration-300",
          isCollapsed ? "px-2" : "px-4"
        )}
      >
        {navigation.map((item) => {
          // Special logic for Dashboard - only active on exact /dashboard match
          const isDashboardActive =
            item.href === "/dashboard" && location.pathname === "/dashboard";
          const shouldUseNavLinkActive = item.href !== "/dashboard";

          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => {
                const isItemActive = shouldUseNavLinkActive
                  ? isActive
                  : isDashboardActive;
                return clsx(
                  "group flex items-center text-sm font-medium rounded-md transition-colors",
                  isCollapsed ? "px-2 py-3 justify-center" : "px-3 py-2",
                  isItemActive
                    ? "text-primary-background border-r-2"
                    : "text-disable hover:text-primary-background hover:bg-gray-100"
                );
              }}
              style={({ isActive }) => {
                const isItemActive = shouldUseNavLinkActive
                  ? isActive
                  : isDashboardActive;
                return isItemActive
                  ? {
                      borderRightColor: "#1F2937",
                      backgroundColor: "rgba(31, 41, 55, 0.1)",
                    }
                  : {};
              }}
              title={isCollapsed ? item.name : undefined}
            >
              {({ isActive }) => {
                const isItemActive = shouldUseNavLinkActive
                  ? isActive
                  : isDashboardActive;
                return (
                  <>
                    <item.icon
                      className={clsx(
                        "h-5 w-5 flex-shrink-0",
                        isItemActive
                          ? "text-primary-background"
                          : "text-disable group-hover:text-primary-background",
                        isCollapsed ? "" : "mr-3"
                      )}
                      aria-hidden="true"
                    />
                    {!isCollapsed && item.name}
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
