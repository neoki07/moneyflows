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
  onCreateOption?: (inputValue: string) => Promise<SelectOption>;
  isCreating?: boolean;
};

const FormSelect = forwardRef<SelectRef, FormSelectProps>(
  ({ field, options, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const control = useInputControl(field);

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
        <Select
          key={control.value?.toString()}
          ref={ref}
          value={options.find((opt) => opt.value === control.value)}
          options={options}
          onChange={(option) => {
            control.change(option?.value ?? "");
          }}
          {...props}
        />
      </div>
    );
  },
);
FormSelect.displayName = "FormSelect";

export { FormSelect };
