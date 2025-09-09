import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  className?: string;
}

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className = "", ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    className={`shrink-0 bg-gray-200 ${className}`}
    {...props}
  />
));

Separator.displayName = SeparatorPrimitive.Root.displayName;
