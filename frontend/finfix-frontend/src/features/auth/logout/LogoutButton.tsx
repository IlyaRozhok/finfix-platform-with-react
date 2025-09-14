import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "@/shared/ui/Button";
import React from "react";

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <Button onClick={logout} variant="primary">
      Exit
    </Button>
  );
}
