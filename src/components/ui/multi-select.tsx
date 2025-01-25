"use client";

import { Command as CommandPrimitive } from "cmdk";
import { X, ChevronDown } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  value?: MultiSelectOption[];
  options: MultiSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  emptyIndicator?: React.ReactNode;
  onChange?: (options: MultiSelectOption[]) => void;
  onCreateOption?: (inputValue: string) => Promise<MultiSelectOption>;
  isCreating?: boolean;
}

export interface MultipleSelectRef {
  selectedValue: MultiSelectOption[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}

const MultiSelect = React.forwardRef<MultipleSelectRef, MultiSelectProps>(
  (
    {
      value,
      options,
      placeholder,
      disabled,
      className,
      emptyIndicator,
      onChange,
      onCreateOption,
      isCreating,
    }: MultiSelectProps,
    ref: React.Ref<MultipleSelectRef>,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);

    const [selected, setSelected] = React.useState<MultiSelectOption[]>(
      value ?? [],
    );
    const selectedRef = React.useRef<MultiSelectOption[]>(value ?? []);
    const [inputValue, setInputValue] = React.useState("");

    const updateSelected = (option?: MultiSelectOption) => {
      if (!option) return;
      const newOptions = [...selectedRef.current, option];
      selectedRef.current = newOptions;
      setSelected(newOptions);
    };

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current!,
        focus: () => inputRef?.current?.focus(),
        reset: () => setSelected([]),
      }),
      [selected],
    );

    const handleUnselect = React.useCallback(
      (option: MultiSelectOption) => {
        const newOptions = selected.filter((s) => s.value !== option.value);
        selectedRef.current = newOptions;
        setSelected(newOptions);
        onChange?.(newOptions);
      },
      [onChange, selected],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "" && selected.length > 0) {
              handleUnselect(selected[selected.length - 1]);
            }
          }
        }
      },
      [handleUnselect, selected],
    );

    const selectables = React.useMemo<MultiSelectOption[]>(
      () =>
        options.filter(
          (option) => !selected.some((s) => s.value === option.value),
        ),
      [options, selected],
    );

    const filteredOptions = React.useMemo(() => {
      if (!inputValue) return selectables;

      return selectables.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
    }, [selectables, inputValue]);

    const CreatableItem = () => {
      if (inputValue.length === 0) {
        return undefined;
      }

      if (options.some((s) => s.label === inputValue)) {
        return undefined;
      }

      if (selected.some((s) => s.label === inputValue)) {
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
            if (onCreateOption) {
              try {
                const newOption = await onCreateOption(value);
                const newOptions = [...selected, newOption];
                setSelected(newOptions);
                onChange?.(newOptions);
              } catch (error) {
                console.error("Failed to create option:", error);
              }
            } else {
              const newOptions = [...selected, { value, label: value }];
              setSelected(newOptions);
              onChange?.(newOptions);
            }
            setInputValue("");
          }}
        >
          {isCreating ? <span>作成中...</span> : `Create "${inputValue}"`}
        </CommandItem>
      );
    };

    return (
      <Command
        className="h-9 overflow-visible bg-transparent"
        shouldFilter={false}
      >
        <div
          onKeyDown={handleKeyDown}
          className={cn(
            "border-input ring-offset-background focus-within:ring-ring relative min-h-9 rounded-md border text-sm focus-within:ring-1",
            {
              "cursor-text": !disabled && selected.length !== 0,
            },
            className,
          )}
        >
          <div className="relative flex h-full flex-wrap items-center gap-1 py-1.5 pr-8 pl-3">
            {selected.map((option) => {
              return (
                <Badge
                  key={option.value}
                  variant="outline"
                  className={cn(
                    "data-disabled:bg-muted-foreground data-disabled:text-muted data-disabled:hover:bg-muted-foreground",
                    "data-fixed:bg-muted-foreground data-fixed:text-muted data-fixed:hover:bg-muted-foreground shrink-0",
                  )}
                  data-disabled={disabled ?? undefined}
                >
                  {option.label}
                  <button
                    className={cn(
                      "ring-offset-background focus:ring-ring -mr-0.5 ml-1 rounded-full outline-hidden focus:ring-2 focus:ring-offset-2",
                    )}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleUnselect(option);
                      }
                    }}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                    onClick={() => handleUnselect(option)}
                  >
                    <X className="text-muted-foreground hover:text-foreground size-3" />
                  </button>
                </Badge>
              );
            })}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              disabled={disabled}
              onValueChange={(value) => {
                setInputValue(value);
              }}
              onBlur={() => {
                setOpen(false);
              }}
              onFocus={() => {
                setOpen(true);
              }}
              placeholder={placeholder}
              className="placeholder:text-muted-foreground flex-1 bg-transparent outline-hidden"
            />
          </div>
          <ChevronDown className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 opacity-50" />
        </div>
        <div className="relative mt-2">
          <CommandList
            onMouseUp={() => {
              inputRef.current?.focus();
            }}
            className={cn(
              "bg-popover text-popover-foreground animate-in absolute top-1 z-10 w-full rounded-md border shadow-md outline-hidden",
              !open && "hidden",
            )}
          >
            {open && (
              <>
                {emptyIndicator &&
                  filteredOptions.length === 0 &&
                  !inputValue && <CommandEmpty>{emptyIndicator}</CommandEmpty>}
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
                        const newOptions = [...selected, option];
                        setInputValue("");
                        updateSelected(option);
                        onChange?.(newOptions);
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
          </CommandList>
        </div>
      </Command>
    );
  },
);
MultiSelect.displayName = "MultipleSelect";

export { MultiSelect };
