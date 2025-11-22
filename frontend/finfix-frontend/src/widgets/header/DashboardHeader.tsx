import React, { useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import LogoutButton from "@/features/auth/logout/LogoutButton";
import { CloseButton } from "@/shared/ui";

export const DashboardHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
            {user?.userName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          {!isMenuOpen && (
            <span className="text-sm text-gray-700">{user?.userName}</span>
          )}
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  {user?.userName?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.userName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <CloseButton handleClose={() => setIsMenuOpen(false)} />
            </div>
            <div className="border-t border-gray-200 pt-4">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
