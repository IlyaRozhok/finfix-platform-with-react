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
  options: { value: T; label: string }[];
  renderButton: (args: { open: boolean }) => React.ReactNode;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  matchWidth?: boolean;
  maxHeight?: number;
  optionsClassName?: string;
  optionClassName?: string;
  variant?: "dark" | "glass";
};

export const ListboxFloating = <T extends string>({
  value,
  onChange,
  options,
  renderButton,
  placement = "bottom-start",
  matchWidth = true,
  maxHeight = 280,
  optionsClassName,
  optionClassName,
  variant = "dark",
}: ListboxFloatingProps<T>) => {
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
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 -translate-y-1 scale-95"
            >
              <Listbox.Options
                ref={refs.setFloating}
                style={floatingStyles}
                className={clsx(
                  "z-[1000] overflow-auto nice-scroll p-1.5",
                  variant === "glass"
                    ? "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] rounded-2xl text-primary-background/90"
                    : "bg-black/90 backdrop-blur-md ring-1 ring-slate-400/25 shadow-2xl rounded-xl text-slate-200",
                  optionsClassName
                )}
              >
                {options.map((opt) => (
                  <Listbox.Option
                    key={opt.value}
                    value={opt.value}
                    className={({ active, selected }) =>
                      clsx(
                        "cursor-pointer select-none rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                        variant === "glass" 
                          ? clsx(
                              "text-primary-background/80",
                              active && "bg-white/10 backdrop-blur-sm",
                              selected && "bg-white/15 backdrop-blur-sm font-medium text-primary-background/90"
                            )
                          : clsx(
                              "text-slate-200",
                              active && "bg-white/10",
                              selected && "bg-sky-400/20"
                            ),
                        optionClassName
                      )
                    }
                  >
                    {opt.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </FloatingPortal>
        </>
      )}
    </Listbox>
  );
};
