import { useAuth } from "@/app/providers/AuthProvider";
import { GoogleLoginButton } from "@/features/auth/google-login/GoogleLoginButton";
import { Navigate } from "react-router-dom";

export function LoginPage() {
  const { user, loading } = useAuth();

  console.log(user);
  //   if (!loading && user) {
  //     return (
  //       <Navigate to={user.isOnboarded ? "/dashboard" : "/onboarding"} replace />
  //     );
  //   }
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-center text-xl font-semibold">FinFix</h1>
        <p className="mb-6 text-center text-sm text-neutral-600">
          Personal finance assistant
        </p>
        <GoogleLoginButton />
      </div>
    </div>
  );
}
