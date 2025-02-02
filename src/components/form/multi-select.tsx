import { useInputControl } from "@conform-to/react";
import { forwardRef, useRef } from "react";

import {
  MultiSelect,
  type MultiSelectOption,
  type MultiSelectRef,
} from "@/components/ui/multi-select";

type FormMultiSelectProps = {
  field: Parameters<typeof useInputControl>[0];
  options: MultiSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  emptyIndicator?: React.ReactNode;
  isLoading?: boolean;
  onCreate?: (value: string) => Promise<MultiSelectOption>;
};

const FormMultiSelect = forwardRef<MultiSelectRef, FormMultiSelectProps>(
  ({ field, options, isLoading, onCreate, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const control = useInputControl(field);
    const values = (control.value ?? []) as string[];

    return (
      <div>
        <input
          ref={inputRef}
          name={field.name}
          value={values.join(",")}
          className="sr-only"
          tabIndex={-1}
          readOnly
        />
        <MultiSelect
          key={values.join(",")}
          ref={ref}
          value={options.filter((opt) => values.includes(opt.value))}
          options={options}
          isLoading={isLoading}
          onCreate={onCreate}
          onChange={(selectedOptions) => {
            control.change(selectedOptions?.map((opt) => opt.value) ?? []);
          }}
          {...props}
        />
      </div>
    );
  },
);
FormMultiSelect.displayName = "FormMultiSelect";

export { FormMultiSelect };
