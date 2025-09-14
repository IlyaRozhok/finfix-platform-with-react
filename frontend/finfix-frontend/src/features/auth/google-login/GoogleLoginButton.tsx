import { ENV } from "@/shared/config/env";
import { Button } from "@/shared/ui/Button";

export function GoogleLoginButton() {
  const url = `${ENV.API_URL}/api/auth/google?next=${encodeURIComponent(
    window.location.origin
  )}`;
  return (
    <Button onClick={() => (window.location.href = url)}>
      Continue with Google
    </Button>
  );
}
