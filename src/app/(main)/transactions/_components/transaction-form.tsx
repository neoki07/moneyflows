import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { Select, SelectOption } from "@/components/ui/select";

const formSchema = z.object({
  date: z.date(),
  description: z.string().min(1).max(20),
  amount: z.string().min(1).max(20),
  type: z.enum(["income", "expense"]),
  category: z.string(),
  tags: z.array(z.string()),
});

export type FormValues = z.infer<typeof formSchema>;

type TransactionFormProps = {
  onSubmit: (values: FormValues) => Promise<void>;
};

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [tagOptions, setTagOptions] = useState<MultiSelectOption[]>([
    {
      label: "タグ1",
      value: "1",
    },
    {
      label: "タグ2",
      value: "2",
    },
    {
      label: "タグ3",
      value: "3",
    },
  ]);

  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([
    {
      label: "食費",
      value: "food",
    },
    {
      label: "交通費",
      value: "transportation",
    },
    {
      label: "娯楽費",
      value: "entertainment",
    },
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      description: "",
      amount: "",
      type: "expense",
      category: "",
      tags: [],
    },
  });

  const handleCreateTag = async (
    inputValue: string,
  ): Promise<MultiSelectOption> => {
    const newOption = {
      label: inputValue,
      value: `${tagOptions.length + 1}`,
    };

    setTagOptions((prev) => [...prev, newOption]);

    return newOption;
  };

  const handleCreateCategory = async (
    inputValue: string,
  ): Promise<SelectOption> => {
    const newOption = {
      label: inputValue,
      value: `${categoryOptions.length + 1}`,
    };

    setCategoryOptions((prev) => [...prev, newOption]);

    return newOption;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>日付</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>内容</FormLabel>
              <FormControl>
                <Input placeholder="例：コンビニ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>金額</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>カテゴリー</FormLabel>
              <FormControl>
                <Select
                  value={
                    field.value
                      ? { label: field.value, value: field.value }
                      : undefined
                  }
                  options={categoryOptions}
                  placeholder="カテゴリーを選択"
                  onChange={(option) => {
                    field.onChange(option?.value ?? "");
                  }}
                  onCreateOption={handleCreateCategory}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タグ</FormLabel>
              <MultiSelect
                {...field}
                value={field.value.map((value) => ({ label: value, value }))}
                options={tagOptions}
                onCreateOption={handleCreateTag}
                onChange={(options) => {
                  field.onChange(options.map((opt) => opt.value));
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          保存
        </Button>
      </form>
    </Form>
  );
}
