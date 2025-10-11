import { TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ReqUserExpense as Row } from "@/features/onboarding/model/types";
import { Input } from "@/shared/ui";
import { useOnboarding } from "../model/store";
import { ListboxFloating } from "@/shared/ui";
import { useAuth } from "@/app/providers/AuthProvider";
import { useEffect, useState } from "react";
import { renderBtn } from "../lib";
import { fetchCategories } from "../api";

// const FREQUENCIES: Row["frequency"][] = ["monthly", "weekly", "yearly"];
const numberRe = /^-?\d*(\.\d*)?$/;

export function ExpenseRow({ row }: { row: Row }) {
  const [categories, setCategories] = useState<
    {
      id: string;
      label: string;
    }[]
  >();

  const { updateExpense, removeExpense, errors, clearExpenseError } =
    useOnboarding();
  const { user } = useAuth();
  const rowError = errors.expenses?.[row.id];

  const getCategories = async () => {
    const categories = await fetchCategories();
    if (categories.length) {
      const formattedCategories = categories?.map((category) => {
        return { id: category.id, label: category.name };
      });
      console.log("123", formattedCategories);
      setCategories(formattedCategories);
    }
  };
  useEffect(() => {
    const data = getCategories();
    console.log("cate", data);

    // setCategories(data);
  }, []);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-2",
        "md:grid-cols-[12rem_1fr_9rem_9rem_3rem] md:items-center my-5"
      )}
    >
      {/* 1. Category */}
      <div className="order-1 md:order-none min-w-0">
        {categories?.length && (
          <ListboxFloating
            value={row.categoryId}
            onChange={(v) =>
              updateExpense(row.id, "categoryId", v, user?.id as string)
            }
            options={categories}
            placement="bottom-start"
            renderButton={() => renderBtn(row.categoryId)}
            optionsClassName="!bg-black/95"
          />
        )}
      </div>

      {/* 2. Description */}
      <div className="order-2 md:order-none min-w-0">
        <Input
          placeholder="Description"
          value={row.description ?? ""}
          onChange={(e) =>
            updateExpense(
              row.id,
              "description",
              e.target.value,
              user?.id as string
            )
          }
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
              updateExpense(row.id, "amount", v, user?.id as string);
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
      {/* <div className="order-4 md:order-none min-w-0">
        <ListboxFloating
          value={row.frequency}
          onChange={(v) =>
            updateExpense(row.id, "frequency", v, user?.id as string)
          }
          options={FREQUENCIES as string[]}
          placement="bottom-start"
          renderButton={() => renderBtn(cap(row.frequency))}
          renderOption={(opt) => <span className="capitalize">{opt}</span>}
          optionsClassName="!bg-black/95"
        />
      </div> */}

      {/* 5. Delete */}
      <div className="order-5 md:order-none flex justify-start">
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
