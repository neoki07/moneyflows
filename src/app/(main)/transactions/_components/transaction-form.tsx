"use client";

import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { z } from "zod";

import { FormDatePicker } from "@/components/form/date-picker";
import { FormMultiSelect } from "@/components/form/multi-select";
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
import { DeepReadonly } from "@/types";

const formSchema = z.object({
  date: z.date({ required_error: "日付を入力してください" }),
  description: z.string({ required_error: "内容を入力してください" }),
  amount: z
    .number({ required_error: "金額を入力してください" })
    .min(1, { message: "金額は1以上で入力してください" }),
  category: z.string().optional(),
  tags: z.array(z.string()),
  // TODO: add transaction type
});

type TransactionFormProps = DeepReadonly<{
  action: FormAction;
}>;

export function TransactionForm({ action }: TransactionFormProps) {
  const [form, fields] = useForm({
    constraint: getZodConstraint(formSchema),
    onValidate: ({ formData }) => {
      console.log("onValidate", formData.get("category"));
      return parseWithZod(formData, { schema: formSchema });
    },
    defaultValue: {
      date: new Date(),
      description: "",
      amount: "",
      category: "",
      tags: [],
    },
  });

  console.log({
    date: fields.date.value,
    category: fields.category.value,
    tags: fields.tags.value,
  });

  return (
    <Form {...getFormProps(form)} action={action}>
      <div className="space-y-4">
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
            options={[
              { value: "1", label: "test" },
              { value: "2", label: "test2" },
            ]}
          />
          {fields.category.errors?.map((error) => (
            <FormErrorMessage key={error} id={fields.category.errorId}>
              {error}
            </FormErrorMessage>
          ))}
        </FormField>
        <FormField>
          <FormLabel htmlFor={fields.tags.id}>タグ</FormLabel>
          <FormMultiSelect
            field={fields.tags}
            options={[
              { value: "1", label: "test" },
              { value: "2", label: "test2" },
            ]}
          />
          {fields.tags.errors?.map((error) => (
            <FormErrorMessage key={error} id={fields.tags.errorId}>
              {error}
            </FormErrorMessage>
          ))}
        </FormField>

        <Button type="submit" className="w-full">
          保存
        </Button>
      </div>
    </Form>
  );
}
