// src/features/onboarding/ui/ExpenseRow.tsx
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ExpenseRow as Row } from "../model/types";
import { Input } from "@/shared/ui";
import { PRESET_CATEGORIES, useOnboarding } from "../model/store";
import { ListboxFloating } from "@/shared/ui/ListboxFloating";

const FREQUENCIES: Row["frequency"][] = ["monthly", "weekly", "yearly"];
const numberRe = /^-?\d*(\.\d*)?$/;

export function ExpenseRow({ row }: { row: Row }) {
  const { updateExpense, removeExpense, errors, clearExpenseError } =
    useOnboarding();
  const rowError = errors.expenses?.[row.id];

  const renderBtn = (label: string) => (
    <button
      type="button"
      className={clsx(
        "relative h-12 w-full rounded-xl px-3 pr-9 text-sm text-slate-200",
        "bg-black/90 backdrop-blur-md",
        "ring-1 ring-slate-400/25 hover:ring-slate-400/40 transition"
      )}
    >
      <span className="block truncate">{label}</span>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-200/80" />
    </button>
  );

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-2",
        "md:grid-cols-[12rem_1fr_9rem_9rem_3rem] md:items-center my-5"
      )}
    >
      {/* 1. Category */}
      <div className="order-1 md:order-none min-w-0">
        <ListboxFloating
          value={row.category}
          onChange={(v) => updateExpense(row.id, "category", v)}
          options={PRESET_CATEGORIES as string[]}
          placement="bottom-start"
          renderButton={() => renderBtn(row.category)}
          optionsClassName="!bg-black/95"
        />
      </div>

      {/* 2. Title */}
      <div className="order-2 md:order-none min-w-0">
        <Input
          placeholder="Title (optional)"
          value={row.title ?? ""}
          onChange={(e) => updateExpense(row.id, "title", e.target.value)}
          className="h-11 min-w-0"
          containerClassName="h-11"
        />
      </div>

      {/* 3. Amount */}
      <div className="order-3 md:order-none min-w-0">
        <Input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={row.amount}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "" || numberRe.test(v)) {
              updateExpense(row.id, "amount", v);
              if (v !== "" && rowError) clearExpenseError(row.id);
            }
            if (v !== "" && Number(v) > 0 && rowError) {
              clearExpenseError(row.id);
            }
          }}
          className="h-11 text-right"
          containerClassName="h-11"
          error={rowError}
        />
      </div>

      {/* 4. Frequency */}
      <div className="order-4 md:order-none min-w-0">
        <ListboxFloating
          value={row.frequency}
          onChange={(v) => updateExpense(row.id, "frequency", v)}
          options={FREQUENCIES as string[]}
          placement="bottom-start"
          renderButton={() => renderBtn(cap(row.frequency))}
          renderOption={(opt) => <span className="capitalize">{opt}</span>}
          optionsClassName="!bg-black/95"
        />
      </div>

      {/* 5. Delete */}
      <div className="order-5 md:order-none flex justify-end">
        <button
          aria-label="Remove expense"
          onClick={() => removeExpense(row.id)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 hover:bg-white/15"
        >
          <TrashIcon className="h-5 w-5 text-slate-300" />
        </button>
      </div>
    </div>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
