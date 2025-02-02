"use client";

import { getFormProps, SubmissionResult, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useEffect, useState } from "react";
import { z } from "zod";

import { FormDatePicker } from "@/components/form/date-picker";
import { FormSelect } from "@/components/form/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormAction,
  FormControl,
  FormErrorMessage,
  FormField,
  FormLabel,
} from "@/components/ui/form-conform";
import { Input } from "@/components/ui/input";
import { SelectOption } from "@/components/ui/select";
import { api } from "@/lib/hono";

const formSchema = z.object({
  date: z.date({ required_error: "日付を入力してください" }),
  description: z.string({ required_error: "内容を入力してください" }),
  amount: z
    .number({ required_error: "金額を入力してください" })
    .min(1, { message: "金額は1以上で入力してください" }),
  category: z.string().optional(),
  tagIds: z.array(z.string()),
});

type TransactionFormProps = {
  type: "income" | "expense";
  action: FormAction;
  defaultValues?: {
    id?: string;
    date: Date;
    description: string;
    amount: number;
    category?: string;
    tagIds: string[];
  };
  lastResult?: SubmissionResult;
};

export function TransactionForm({
  type,
  action,
  defaultValues,
  lastResult,
}: TransactionFormProps) {
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const [form, fields] = useForm({
    constraint: getZodConstraint(formSchema),
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: formSchema });
    },
    defaultValue: {
      date: defaultValues?.date ?? new Date(),
      description: defaultValues?.description ?? "",
      amount: defaultValues?.amount ?? undefined,
      category: defaultValues?.category ?? "",
      tagIds: defaultValues?.tagIds ?? [],
    },
  });

  useEffect(() => {
    setIsLoadingCategories(true);

    async function fetchCategories() {
      const res = await api.categories.$get({ query: { type } });
      if (res.ok) {
        const json = await res.json();
        const options = json.categories.map((c) => ({
          value: c.id,
          label: c.name,
        }));
        setCategories(options);
      }
      setIsLoadingCategories(false);
    }

    fetchCategories();
  }, [type]);

  const handleCreateCategory = async (name: string) => {
    setIsLoadingCategories(true);
    try {
      const res = await api.categories.$post({
        json: { name, type },
      });
      if (!res.ok) {
        throw new Error("カテゴリーの作成に失敗しました");
      }
      const { category } = await res.json();
      const newOption = { value: category.id, label: category.name };
      setCategories((prev) => [...prev, newOption]);
      return newOption;
    } finally {
      setIsLoadingCategories(false);
    }
  };

  return (
    <Form {...getFormProps(form)} action={action}>
      <div className="space-y-4">
        {defaultValues?.id && (
          <input type="hidden" name="id" value={defaultValues.id} />
        )}
        <input type="hidden" name="type" value={type} />
        <FormField>
          <FormLabel htmlFor={fields.date.id} required>
            日付
          </FormLabel>
          <FormDatePicker field={fields.date} />
          {fields.date.errors?.map((error) => (
            <FormErrorMessage key={error} id={fields.date.errorId}>
              {error}
            </FormErrorMessage>
          ))}
        </FormField>
        <FormField>
          <FormLabel htmlFor={fields.description.id} required>
            内容
          </FormLabel>
          <FormControl field={fields.description}>
            <Input />
          </FormControl>
          {fields.description.errors?.map((error) => (
            <FormErrorMessage key={error} id={fields.description.errorId}>
              {error}
            </FormErrorMessage>
          ))}
        </FormField>
        <FormField>
          <FormLabel htmlFor={fields.amount.id} required>
            金額
          </FormLabel>
          <FormControl field={fields.amount}>
            <Input type="number" />
          </FormControl>
          {fields.amount.errors?.map((error) => (
            <FormErrorMessage key={error} id={fields.amount.errorId}>
              {error}
            </FormErrorMessage>
          ))}
        </FormField>
        <FormField>
          <FormLabel htmlFor={fields.category.id}>カテゴリー</FormLabel>
          <FormSelect
            field={fields.category}
            options={categories}
            isLoading={isLoadingCategories}
            onCreate={handleCreateCategory}
            placeholder="カテゴリーを選択"
          />
          {fields.category.errors?.map((error) => (
            <FormErrorMessage key={error} id={fields.category.errorId}>
              {error}
            </FormErrorMessage>
          ))}
        </FormField>
        {/* TODO: add tags */}
        <Button type="submit" className="w-full">
          保存
        </Button>
      </div>
    </Form>
  );
}
