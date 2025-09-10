import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';

function Loader() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="animate-pulse text-sm text-neutral-500">Loading…</div>
    </div>
  );
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace state={{ next: loc.pathname }} />;
  return <>{children}</>;
}

export function RequireOnboarded({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return null; // уже отфильтровано в RequireAuth
  if (!user.isOnboarded) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

export function RequireNotOnboarded({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return null;
  if (user.isOnboarded) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}