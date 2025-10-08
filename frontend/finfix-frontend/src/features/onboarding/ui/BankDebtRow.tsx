// src/features/onboarding/ui/DebtRow.tsx
import {
  ChevronDownIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ListboxFloating } from "@/shared/ui/ListboxFloating";
import { Input } from "@/shared/ui";
import { useOnboarding } from "../model/store";
import { Debt as Row } from "@entities/debts/model";

const numRe = /^-?\d*(\.\d*)?$/;
const pctRe = /^-?\d*(\.\d*)?$/;
const DEBT_TYPES = [
  { id: "credit_card", label: "Credit card" },
  { id: "bank_loan", label: "Bank loan" },
  { id: "mortgage", label: "Mortgage" },
  { id: "car", label: "Car loan" },
  { id: "other", label: "Other" },
];

export type DebtTypeId = (typeof DEBT_TYPES)[number]["id"];

export const BankDebtRow = ({ row }: { row: Row }) => {
  const { updateDebt, removeDebt, errors, validateDebtRow } = useOnboarding();

  const renderBtn = (label: string) => (
    <button
      type="button"
      className={clsx(
        "relative h-11 w-full rounded-xl px-3 pr-9 text-sm text-slate-200",
        "bg-black/90 backdrop-blur-md ring-1 ring-slate-400/25 hover:ring-slate-400/40"
      )}
    >
      <span className="block truncate">{label}</span>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-200/80" />
    </button>
  );

  const typeLabel =
    DEBT_TYPES.find((t) => t.id === row.debtType)?.label ?? "Credit card";

  return (
    <div className="grid min-h-[84px] grid-cols-1 gap-2 md:grid-cols-[12rem_1fr_9rem_10rem_8rem_3rem] md:items-center items-stretch">
      {/* type */}
      <div className="min-w-0">
        <ListboxFloating
          value={row.debtType}
          onChange={(v) => updateDebt(row.id, "debtType", v as Row["debtType"])}
          options={DEBT_TYPES.map((t) => t.id) as string[]}
          renderButton={() => renderBtn(typeLabel)}
          renderOption={(id) => (
            <span>{DEBT_TYPES.find((t) => t.id === id)?.label}</span>
          )}
        />
      </div>

      {/* description */}
      <Input
        placeholder="Description"
        value={row.description}
        onChange={(e) => updateDebt(row.id, "description", e.target.value)}
        containerClassName="h-11"
        className="h-full"
      />

      {/* total debt */}
      <Input
        placeholder="0.00"
        inputMode="decimal"
        value={row.totalDebt}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "" || numRe.test(v)) updateDebt(row.id, "totalDebt", v);
          validateDebtRow(row.id);
        }}
        onBlur={() => validateDebtRow(row.id)}
        containerClassName="h-11"
        className="h-full text-right"
        error={errors.debts?.[row.id]}
      />

      {/* monthly payment */}
      <Input
        placeholder="0.00"
        inputMode="decimal"
        value={row.monthlyPayment}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "" || numRe.test(v))
            updateDebt(row.id, "monthlyPayment", v);
        }}
        onBlur={() => validateDebtRow(row.id)} // <— ВАЖНО
        containerClassName="h-11"
        className="h-full text-right"
        error={errors.debts?.[row.id]}
      />

      {/* interest (monthly, %) */}
      <Input
        placeholder="% per month"
        inputMode="decimal"
        value={row.interestRateMonthly}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "" || pctRe.test(v))
            updateDebt(row.id, "interestRateMonthly", v);
        }}
        containerClassName="h-11"
        className="h-full text-right"
      />

      {/* remove */}
      <div className="flex justify-end">
        <button
          aria-label="Remove debt"
          onClick={() => removeDebt(row.id)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 hover:bg-white/15"
        >
          <TrashIcon className="h-5 w-5 text-slate-300" />
        </button>
      </div>
    </div>
  );
};
