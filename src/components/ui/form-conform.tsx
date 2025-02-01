"use client";

import { FieldMetadata, getInputProps } from "@conform-to/react";
import { Slot } from "@radix-ui/react-slot";
import Form, { FormProps } from "next/form";
import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DeepReadonly } from "@/types";

import { RequiredBadge } from "./required-badge";

type FormAction = FormProps["action"];

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1.5", className)} {...props} />
));
FormField.displayName = "FormField";

type FormLabelProps = React.ComponentPropsWithoutRef<typeof Label> & {
  required?: boolean;
};

const FormLabel = React.forwardRef<
  React.ComponentRef<typeof Label>,
  FormLabelProps
>(({ className, required, children, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  >
    {children}
    {required && <RequiredBadge />}
  </Label>
));
FormLabel.displayName = "FormLabel";

type FormErrorProps = DeepReadonly<{
  id?: string;
  children: React.ReactNode;
}>;

const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & FormErrorProps
>(({ className, id, children, ...props }, ref) => {
  if (!children) return null;

  return (
    <p
      ref={ref}
      id={id}
      className={cn("text-destructive text-[0.8rem] font-medium", className)}
      {...props}
    >
      {children}
    </p>
  );
});
FormErrorMessage.displayName = "FormErrorMessage";

type FormControlProps = {
  field: FieldMetadata<unknown>;
  children: React.ReactNode;
};

const FormControl = React.forwardRef<HTMLElement, FormControlProps>(
  ({ field, children }, ref) => {
    const { key, ...inputProps } = getInputProps(field, { type: "text" });

    return (
      <Slot key={key} ref={ref} {...inputProps}>
        {children}
      </Slot>
    );
  },
);
FormControl.displayName = "FormControl";

export {
  Form,
  type FormAction,
  FormControl,
  FormErrorMessage,
  FormField,
  FormLabel,
};
