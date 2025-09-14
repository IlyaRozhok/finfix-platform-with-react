import { useAuth } from "@/app/providers/AuthProvider";

export function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-neutral-600">
        Welcome, {user?.name ?? user?.email}
      </p>
    </div>
  );
}
