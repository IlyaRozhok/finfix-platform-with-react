import React from "react";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div>
      <header>
        <nav>
          <div>Logo</div>
          <button>Logout</button>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
