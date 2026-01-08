import { useAuth } from "@/app/providers/AuthProvider";

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-0">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          Welcome back, {user?.userName ?? user?.email}
        </h1>
        <p className="mt-1 text-sm sm:text-base">Here you can see your financial overview</p>
      </div>
    </div>
  );
}
