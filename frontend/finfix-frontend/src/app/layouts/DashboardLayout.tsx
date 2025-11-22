import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "@/widgets/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/widgets/header/DashboardHeader";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

