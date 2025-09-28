import { Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useOnboarding } from "../model/store";

const currencies = ["UAH", "USD", "EUR"];

export function CurrencyListbox() {
  const { setCurrency, data } = useOnboarding();

  useEffect(() => {
    setCurrency("UAH");
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <Listbox value={data.baseCurrency} onChange={setCurrency}>
        <div className="relative">
          {/* Кнопка */}
          <Listbox.Button
            className={clsx(
              "w-full rounded-xl px-3 py-2 text-sm text-slate-200",
              "bg-black/90 backdrop-blur-md"
            )}
          >
            <span className="block truncate">{data.baseCurrency}</span>
            <ChevronDownIcon
              className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400"
              aria-hidden="true"
            />
          </Listbox.Button>

          {/* Список опций */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Listbox.Options
              className={clsx(
                "absolute z-50 mt-2 w-full overflow-hidden rounded-xl",
                "border-none bg-slate-300/20 backdrop-blur-[3px] shadow-2xl"
              )}
            >
              {currencies.map((cur) => (
                <Listbox.Option
                  key={cur}
                  value={cur}
                  className={({ active }) =>
                    clsx(
                      "cursor-pointer select-none px-3 py-2 text-sm",
                      active ? "bg-slate-800/60" : "bg-transparent",
                      "text-slate-200"
                    )
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center gap-2">
                      {selected && (
                        <CheckIcon className="h-4 w-4 shrink-0 text-sky-400" />
                      )}
                      <span
                        className={clsx("truncate", selected && "font-medium")}
                      >
                        {cur}
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
