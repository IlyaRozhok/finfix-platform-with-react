import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "black-blur";
  handler?: (param?: string | number) => void;
  param?: string | number;
};
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, handler, param, variant = "primary", ...p },
  ref
) {
  const base =
    "rounded-xl px-4 py-2 text-sm font-medium transition cursor-pointer";

  let styles =
    variant === "primary"
      ? "bg-black text-white hover:bg-white hover:text-black active:bg-black"
      : "bg-neutral-400 hover:text-black hover:bg-neutral-300";

  if (variant === "black-blur") {
    styles =
      "bg-black/60 backdrop-blur-[3px] hover:text-black hover:bg-white/90";
  }

  const handleClick = () => {
    if (handler && param) {
      return handler(param);
    }
    if (handler) {
      handler();
    }
  };
  return (
    <button
      onClick={handleClick}
      ref={ref}
      className={clsx(base, styles, className)}
      {...p}
    />
  );
});
