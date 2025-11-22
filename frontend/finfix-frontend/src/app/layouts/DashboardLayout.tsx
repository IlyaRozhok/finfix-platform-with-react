import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "@/widgets/dashboard/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

