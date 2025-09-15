import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", ...p },
  ref
) {
  const base =
    "rounded-xl px-4 py-2 text-sm font-medium transition cursor-pointer";
  const styles =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-primary-blue active:bg-black"
      : "bg-gray-200 text-neutral-700 hover:bg-neutral-300";
  return <button ref={ref} className={clsx(base, styles, className)} {...p} />;
});
