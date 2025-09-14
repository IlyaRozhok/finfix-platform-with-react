import { useAuth } from "@/app/providers/AuthProvider";
import LogoutButton from "@/features/auth/logout/LogoutButton";
import React from "react";
import logo from "@/assets/logo.png";

type HeaderProps = {
  title?: string;
  showMenuButton?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ title = "Finfix" }) => {
  const { user } = useAuth();

  return (
    <header className="px-10 flex items-center justify-between h-14 backdrop-blur supports-[backdrop-filter]:bg-light-blue/90">
      <div className="flex gap-2">
        <div className="text-xl font-semibold tracking-tight pt-1">{title}</div>
        <img src={logo} alt="logo" className="w-10" />
      </div>
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
