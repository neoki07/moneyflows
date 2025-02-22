import { useInputControl } from "@conform-to/react";
import { forwardRef, useRef } from "react";

import {
  Select,
  type SelectOption,
  type SelectRef,
} from "@/components/ui/select";

type FormSelectProps = {
  field: Parameters<typeof useInputControl>[0];
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  emptyIndicator?: React.ReactNode;
  isLoading?: boolean;
  onCreate?: (value: string) => Promise<SelectOption>;
};

const FormSelect = forwardRef<SelectRef, FormSelectProps>(
  ({ field, options, isLoading, onCreate, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const control = useInputControl(field);
    const value = (control.value ?? undefined) as string | undefined;

    return (
      <div>
        <input
          ref={inputRef}
          name={field.name}
          value={value ?? ""}
          className="sr-only"
          tabIndex={-1}
          readOnly
        />
        <Select
          key={value}
          ref={ref}
          value={value}
          options={options}
          isLoading={isLoading}
          onCreate={onCreate}
          onChange={(value) => {
            control.change(value ?? "");
          }}
          {...props}
        />
      </div>
    );
  },
);
FormSelect.displayName = "FormSelect";

export { FormSelect };
