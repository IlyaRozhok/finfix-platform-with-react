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
    <header className="px-10 flex items-center justify-between h-14 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-slate-300/60">
      <div className="text-base font-semibold tracking-tight">{title}</div>
      <div className="flex item-center gap-2">
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
        <LogoutButton />
      </div>
    </header>
  );
};
