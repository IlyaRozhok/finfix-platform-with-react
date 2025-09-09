import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-full bg-sky-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-4xl px-4 h-16 flex items-center ">
          <Link to="/" className="flex items-center space-x-3 group">
            <span className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
              FinFix
            </span>
          </Link>
        </div>
      </header>

      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  );
}
