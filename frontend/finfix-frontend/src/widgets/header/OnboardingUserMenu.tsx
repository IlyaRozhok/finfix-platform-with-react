import { useAuth } from "@/app/providers/AuthProvider";
import LogoutButton from "@/features/auth/logout/LogoutButton";
import { CloseButton } from "@/shared/ui";

import React, { useState } from "react";

export const OnboardingUserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="size-8 rounded-full bg-neutral-200 overflow-hidden cursor-pointer"
        >
          {user?.avatarUrl ? (
            <img src={user?.avatarUrl} alt="avatar" />
          ) : (
            <p>Ava</p>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-3 top-14 w-64 rounded-2xl border bg-white shadow-md p-2 item: px-3 py-2 rounded-xl text-sm">
          <div className="absolute right-3 top-1">
            <CloseButton handleClose={() => setIsOpen(false)} />
          </div>
          <p className="text-xs font-medium text-neutral-700 grid place-items-center mb-5">
            Hello, {user?.userName}
          </p>
          <LogoutButton />
        </div>
      )}
    </>
  );
};
