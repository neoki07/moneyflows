"use client";

import { Command as CommandPrimitive } from "cmdk";
import { ChevronDown, Loader2 } from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  value?: SelectOption;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  emptyIndicator?: React.ReactNode;
  onChange?: (option: SelectOption | undefined) => void;
  onCreate?: (value: string) => Promise<SelectOption>;
  isLoading?: boolean;
};

export type SelectRef = {
  selectedValue: SelectOption | undefined;
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
};

const Select = React.forwardRef<SelectRef, SelectProps>(
  (
    {
      value,
      options,
      placeholder,
      disabled,
      className,
      emptyIndicator,
      onChange,
      onCreate,
      isLoading,
    }: SelectProps,
    ref: React.Ref<SelectRef>,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<SelectOption | undefined>(
      value,
    );
    const [inputValue, setInputValue] = React.useState("");

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: selected,
        input: inputRef.current!,
        focus: () => inputRef?.current?.focus(),
        reset: () => setSelected(undefined),
      }),
      [selected],
    );

    const filteredOptions = React.useMemo(() => {
      if (!inputValue) return options;

      return options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
    }, [options, inputValue]);

    const CreatableItem = () => {
      if (inputValue.length === 0) {
        return undefined;
      }

      if (options.some((s) => s.label === inputValue)) {
        return undefined;
      }

      return (
        <CommandItem
          className="cursor-pointer"
          value={inputValue}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={async (value: string) => {
            if (onCreate) {
              try {
                const newOption = await onCreate(value);
                setSelected(newOption);
                onChange?.(newOption);
              } catch (error) {
                console.error("Failed to create option:", error);
              }
            } else {
              const newOption = { value, label: value };
              setSelected(newOption);
              onChange?.(newOption);
            }
            setInputValue("");
            setOpen(false);
          }}
        >
          {isLoading ? <span>作成中...</span> : `"${inputValue}"を作成`}
        </CommandItem>
      );
    };

    return (
      <Command
        className="h-9 overflow-visible bg-transparent"
        shouldFilter={false}
      >
        <div
          className={cn(
            "border-input ring-offset-background focus-within:ring-ring relative h-9 w-full rounded-md border bg-transparent text-sm focus-within:ring-1",
            className,
          )}
        >
          <div className="relative flex h-full items-center py-1.5 pr-8 pl-3">
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue || selected?.label || ""}
              disabled={disabled}
              onValueChange={(value) => {
                setInputValue(value);
                if (!value && selected) {
                  setSelected(undefined);
                  onChange?.(undefined);
                }
                setOpen(true);
              }}
              onBlur={() => {
                setOpen(false);
                if (selected && !inputValue) {
                  setInputValue(selected.label);
                }
              }}
              onFocus={() => {
                setOpen(true);
                if (selected && !inputValue) {
                  setInputValue(selected.label);
                }
              }}
              placeholder={placeholder}
              className="placeholder:text-muted-foreground w-full border-none bg-transparent outline-hidden"
            />
          </div>
          <ChevronDown className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 opacity-50" />
        </div>
        <div className="relative mt-2">
          <CommandList
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={cn(
              "bg-popover text-popover-foreground animate-in absolute top-0 z-10 w-full rounded-md border shadow-md outline-hidden",
              !open && "hidden",
            )}
          >
            {open && (
              <>
                {isLoading ? (
                  <div className="text-muted-foreground flex items-center justify-center p-4 text-sm">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    読み込み中...
                  </div>
                ) : (
                  <>
                    {emptyIndicator &&
                      filteredOptions.length === 0 &&
                      !inputValue && (
                        <CommandEmpty>{emptyIndicator}</CommandEmpty>
                      )}
                    <CommandGroup className="h-full overflow-auto">
                      {filteredOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onSelect={() => {
                            setSelected(option);
                            onChange?.(option);
                            setInputValue("");
                            setOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </CommandItem>
                      ))}
                      {CreatableItem()}
                    </CommandGroup>
                  </>
                )}
              </>
            )}
          </CommandList>
        </div>
      </Command>
    );
  },
);
Select.displayName = "Select";

export { Select };
