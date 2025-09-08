import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-full">
      <header className="border-b bg-blue-950">
        <div className="mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold">
            FinFix
          </Link>
          <nav className="flex gap-3 text-sm">
            <Link to="/" className="hover:underline">
              Expenses
            </Link>
            <Link
              to="/expenses/new"
              className="px-2 py-1 rounded bg-black text-white"
            >
              Add
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
