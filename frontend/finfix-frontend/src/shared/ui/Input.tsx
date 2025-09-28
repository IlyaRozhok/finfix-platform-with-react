import React from "react";
import clsx from "clsx";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  error?: string | boolean;
};

export const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled,
  ...rest
}) => {
  const isError = Boolean(error);

  return (
    <div className={clsx("w-full relative")}>
      {label && (
        <label className="mb-1.5 block text-sm text-slate-300">{label}</label>
      )}

      <div
        className={clsx(
          "relative flex items-center rounded-xl transition-shadow",
          "bg-black/90 backdrop-blur-md",
          "ring-1 ring-slate-400/25 hover:ring-slate-400/40",
          "focus-within:ring-2 focus-within:ring-slate-400/50",
          disabled && "opacity-60 pointer-events-none"
        )}
      >
        <input
          disabled={disabled}
          className={clsx(
            "w-full relative bg-transparent text-slate-200 placeholder:text-slate-400",
            "outline-none px-3 py-2 text-sm",
            isError && "ring-2 ring-rose-500/70 rounded-xl"
          )}
          {...rest}
        />
      </div>

      {isError && (
        <div className="absolute left-1/2 -translate-x-1/2 w-full flex justify-center">
          <p
            className={clsx(
              "mt-1 text-xs text-center",
              isError ? "text-rose-400" : "text-slate-400"
            )}
          >
            {error}
          </p>
        </div>
      )}
    </div>
  );
};
