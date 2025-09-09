import { useState } from "react";
import {
  Home,
  BarChart3,
  CreditCard,
  Calendar,
  Settings,
  TrendingUp,
  DollarSign,
  PieChart,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "transactions", label: "Transactions", icon: FileText },
  { id: "budgets", label: "Budgets", icon: PieChart },
  { id: "debts", label: "Debts", icon: CreditCard },
  { id: "goals", label: "Goals", icon: TrendingUp },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  activeSection,
  onSectionChange,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">FinFix</h1>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  User
                </p>
                <p className="text-xs text-gray-500 truncate">
                  user@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
