import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ListboxFloating } from "@/shared/ui/ListboxFloating";
import { useOnboarding } from "../model/store";
import clsx from "clsx";

const CURRENCIES = ["UAH", "USD", "EUR"];

export function CurrencyListbox() {
  const { data, setCurrency } = useOnboarding();

  return (
    <div className="relative w-full max-w-md">
      <ListboxFloating
        value={data.baseCurrency || "UAH"}
        onChange={setCurrency}
        options={CURRENCIES}
        placement="bottom-start"
        renderButton={() => (
          <button
            className={clsx(
              "relative w-full h-10 rounded-xl px-3 pr-9 text-sm text-slate-200",
              "bg-black/90 backdrop-blur-md ring-1 ring-slate-400/25 hover:ring-slate-400/40"
            )}
          >
            <span className="block truncate">{data.baseCurrency || "UAH"}</span>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-200/80" />
          </button>
        )}
      />
    </div>
  );
}
