"use client";

import { getFormProps, SubmissionResult, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormAction,
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@/components/ui/form-conform";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z
    .string({ required_error: "カテゴリー名を入力してください" })
    .min(1, "カテゴリー名を入力してください")
    .max(20, "カテゴリー名は20文字以内で入力してください"),
});

export type FormValues = z.infer<typeof formSchema>;

type CategoryFormProps = {
  action: FormAction;
  disabled?: boolean;
  lastResult?: SubmissionResult;
};

export function CategoryForm({
  action,
  disabled,
  lastResult,
}: CategoryFormProps) {
  const [form, fields] = useForm({
    constraint: getZodConstraint(formSchema),
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: formSchema });
    },
    defaultValue: {
      name: "",
    },
  });

  return (
    <Form {...getFormProps(form)} action={action}>
      <div className="space-y-6">
        <FormField>
          <FormLabel htmlFor={fields.name.id} required>
            名前
          </FormLabel>
          <FormControl field={fields.name}>
            <Input placeholder="例：食費、交通費、給料" disabled={disabled} />
          </FormControl>
          {fields.name.errors?.map((error) => (
            <FormError key={error} id={fields.name.errorId}>
              {error}
            </FormError>
          ))}
        </FormField>
        <Button type="submit" className="w-full" disabled={disabled}>
          保存
        </Button>
      </div>
    </Form>
  );
}
