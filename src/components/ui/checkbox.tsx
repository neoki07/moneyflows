"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { IconCheck, IconMinus } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer border-muted-foreground/50 ring-offset-background focus-visible:ring-ring data-[state=checked]:text-primary-foreground grid size-4 shrink-0 place-content-center rounded-sm border bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[#007DFC] data-[state=checked]:bg-[#007DFC]",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="data-[state=indeterminate]:[&>:first-child]:hidden data-[state=checked]:[&>:last-child]:hidden">
      <IconCheck strokeWidth={3} className="size-3" />
      <IconMinus strokeWidth={3} className="size-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
