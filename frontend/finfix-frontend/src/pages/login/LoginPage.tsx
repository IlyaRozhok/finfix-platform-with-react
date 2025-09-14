import { useAuth } from "@/app/providers/AuthProvider";
import { GoogleLoginButton } from "@/features/auth/google-login/GoogleLoginButton";
import { Navigate, useLocation } from "react-router-dom";

export function LoginPage() {
  const { user, loading } = useAuth();
  const loc = useLocation();

  if (!loading && user) {
    const next = (loc.state as any)?.next as string | undefined;
    const target = next ?? (user.isOnboarded ? "/dashboard" : "/onboarding");
    return <Navigate to={target} replace />;
  }

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-center text-xl font-semibold">FinFix</h1>
        <p className="mb-6 text-center text-sm text-neutral-600">
          Personal finance assistant
        </p>
        <div className="flex">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}