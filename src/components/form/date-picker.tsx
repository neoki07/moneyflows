"use client";

import { useInputControl } from "@conform-to/react";
import { forwardRef, useRef } from "react";

import {
  DatePicker,
  type DatePickerProps,
  type DatePickerRef,
} from "@/components/ui/date-picker";

type FormDatePickerProps = {
  field: Parameters<typeof useInputControl>[0];
} & Omit<DatePickerProps, "value" | "onChange">;

const FormDatePicker = forwardRef<DatePickerRef, FormDatePickerProps>(
  ({ field, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const control = useInputControl(field);
    const date =
      typeof control.value === "string" ? new Date(control.value) : undefined;

    return (
      <div>
        <input
          ref={inputRef}
          name={field.name}
          value={control.value ?? ""}
          className="sr-only"
          tabIndex={-1}
          readOnly
        />
        <DatePicker
          key={control.value?.toString()}
          ref={ref}
          value={date}
          onChange={(date) => {
            control.change(date?.toISOString() ?? "");
          }}
          {...props}
        />
      </div>
    );
  },
);
FormDatePicker.displayName = "FormDatePicker";

export { FormDatePicker };
