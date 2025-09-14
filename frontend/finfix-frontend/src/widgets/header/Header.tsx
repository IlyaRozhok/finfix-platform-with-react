import { useAuth } from "@/app/providers/AuthProvider";
import LogoutButton from "@/features/auth/logout/LogoutButton";
import React from "react";

type HeaderProps = {
  title?: string;
  showMenuButton?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ title = "Finfix" }) => {
  const { user } = useAuth();

  return (
    <header className="h-14 ">
      <nav className="px-3 flex items-center justify-between border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex items-center justify-center gap-2">
          <div className="size-8 rounded-full bg-neutral-200 overflow-hidden">
            {user?.avatarUrl ? (
              <img src={user?.avatarUrl} alt="avatar" />
            ) : (
              <p>Ava</p>
            )}
          </div>
          <p className="text-xs font-medium text-neutral-700 grid place-items-center">
            {user?.userName}
          </p>
        </div>

        <div className="text-base font-semibold tracking-tight">{title}</div>
        <div>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};
