// src/shared/ui/ListboxFloating.tsx
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  useFloating,
  offset,
  flip,
  size,
  autoUpdate,
  FloatingPortal,
} from "@floating-ui/react";
import clsx from "clsx";

type ListboxFloatingProps<T extends string> = {
  value: T;
  onChange: (v: T) => void;
  options: T[];
  renderButton: (args: { open: boolean }) => React.ReactNode;
  renderOption?: (opt: T) => React.ReactNode;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  matchWidth?: boolean;
  maxHeight?: number;
  optionsClassName?: string; // <- стили контейнера меню
  optionClassName?: string; // <- стили пункта меню
};

export function ListboxFloating<T extends string>({
  value,
  onChange,
  options,
  renderButton,
  renderOption,
  placement = "bottom-start",
  matchWidth = true,
  maxHeight = 280,
  optionsClassName,
  optionClassName,
}: ListboxFloatingProps<T>) {
  const { refs, floatingStyles } = useFloating({
    placement,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip(),
      size({
        apply({ rects, elements }) {
          if (matchWidth) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          }
          Object.assign(elements.floating.style, {
            maxHeight: `${maxHeight}px`,
          });
        },
      }),
    ],
  });

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Button as={Fragment}>
            <div ref={refs.setReference}>{renderButton({ open })}</div>
          </Listbox.Button>

          <FloatingPortal>
            <Transition
              as={Fragment}
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-1"
            >
              <Listbox.Options
                ref={refs.setFloating}
                style={floatingStyles}
                className={clsx(
                  "z-[1000] overflow-auto rounded-xl",
                  "bg-black/90 backdrop-blur-md",
                  "ring-1 ring-slate-400/25 shadow-2xl",
                  "p-1", // тонкий внутренний паддинг
                  optionsClassName
                )}
              >
                {options.map((opt) => (
                  <Listbox.Option
                    key={opt}
                    value={opt}
                    className={({ active, selected }) =>
                      clsx(
                        "cursor-pointer select-none rounded-lg px-3 py-2 text-sm",
                        "text-slate-200",
                        active && "bg-white/10",
                        selected && "bg-sky-400/20",
                        optionClassName
                      )
                    }
                  >
                    {renderOption ? renderOption(opt) : opt}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </FloatingPortal>
        </>
      )}
    </Listbox>
  );
}
