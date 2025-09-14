import { useAuth } from "@/app/providers/AuthProvider";
import { GoogleLoginButton } from "@/features/auth/google-login/GoogleLoginButton";
import { Navigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

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
      <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-sm ">
        <div className="flex justify-center gap-2">
          <h1 className="mb-4 text-center text-xl font-semibold pt-1">
            FinFix
          </h1>
          <img src={logo} alt="logo" className="max-w-[35px] pb-2" />
        </div>
        <p className="mb-6 text-center text-sm text-neutral-600">
          Personal finance assistant
        </p>
        <div className="flex justify-center">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
