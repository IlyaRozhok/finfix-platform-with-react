import { ENV } from "@/shared/config/env";
import { Button } from "@/shared/ui/Button";

export function GoogleLoginButton() {
  // Бэкенд сам редиректит на Google и ставит cookie по колбэку.
  // next передаём, чтобы вернуться обратно в приложение
  const url = `${ENV.API_URL}/api/auth/google?next=${encodeURIComponent(
    window.location.origin
  )}`;
  return (
    <Button onClick={() => (window.location.href = url)}>
      Continue with Google
    </Button>
  );
}
