// src/features/onboarding/ui/ExpenseRow.tsx
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import { ExpenseRow as Row } from "../model/types";
import { Input } from "@/shared/ui";
import { PRESET_CATEGORIES, useOnboarding } from "../model/store";

const FREQUENCIES: Row["frequency"][] = ["monthly", "weekly", "yearly"];

export function ExpenseRow({ row }: { row: Row }) {
  const { updateExpense, removeExpense, errors } = useOnboarding();
  const rowError = errors.expenses?.[row.id];

  const allow = /^-?\d*(\.\d*)?$/; // простой фильтр

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_140px_140px_40px] gap-2 items-start">
      {/* Category + optional title in one line on mobile */}
      <div className="flex gap-2">
        {/* Category */}
        <div className="relative w-40">
          <Listbox
            value={row.category}
            onChange={(v) => updateExpense(row.id, "category", v)}
          >
            <div className="relative">
              <Listbox.Button
                className={clsx(
                  "w-[160px] rounded-xl px-3 py-2 text-sm text-slate-200",
                  "bg-black/90 backdrop-blur-md ring-1 ring-slate-400/25"
                )}
              >
                <span className="block truncate">{row.category}</span>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={clsx(
                    "absolute z-50 mt-2 w-full overflow-hidden rounded-xl",
                    "bg-slate-900/90 backdrop-blur-md shadow-2xl"
                  )}
                >
                  {PRESET_CATEGORIES.map((c) => (
                    <Listbox.Option
                      key={c}
                      value={c}
                      className={({ active }) =>
                        clsx(
                          "cursor-pointer select-none px-3 py-2 text-sm text-slate-200",
                          active ? "bg-slate-800/60" : ""
                        )
                      }
                    >
                      {c}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Optional title */}
        <Input
          className="outline-none boder-none focus:border-none focus:outline-none active:border-none active:outline-none ring-0"
          placeholder="Title (optional)"
          value={row.title ?? ""}
          onChange={(e) => updateExpense(row.id, "title", e.target.value)}
          className="flex-1 h-[35px] px-5"
        />
      </div>

      {/* Amount */}
      <Input
        type="text"
        inputMode="decimal"
        placeholder="0.00"
        value={row.amount}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "" || allow.test(v)) updateExpense(row.id, "amount", v);
        }}
        error={rowError}
      />

      {/* Frequency */}
      <div className="relative">
        <Listbox
          value={row.frequency}
          onChange={(v) => updateExpense(row.id, "frequency", v)}
        >
          <div className="relative">
            <Listbox.Button
              className={clsx(
                "w-full rounded-xl px-3 py-2 text-sm text-slate-200",
                "bg-black/90 backdrop-blur-md ring-1 ring-slate-400/25"
              )}
            >
              <span className="capitalize">{row.frequency}</span>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={clsx(
                  "absolute z-50 mt-2 w-full overflow-hidden rounded-xl",
                  "bg-slate-900/90 backdrop-blur-md shadow-2xl"
                )}
              >
                {FREQUENCIES.map((f) => (
                  <Listbox.Option
                    key={f}
                    value={f}
                    className={({ active }) =>
                      clsx(
                        "cursor-pointer select-none px-3 py-2 text-sm text-slate-200",
                        active ? "bg-slate-800/60" : ""
                      )
                    }
                  >
                    <span className="capitalize">{f}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* Remove */}
      <button
        aria-label="Remove expense"
        onClick={() => removeExpense(row.id)}
        className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/15"
      >
        <TrashIcon className="h-5 w-5 text-slate-300" />
      </button>
    </div>
  );
}
