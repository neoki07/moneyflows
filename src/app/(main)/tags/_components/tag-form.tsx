"use client";

import { getFormProps, SubmissionResult, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { z } from "zod";

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

const formSchema = z.object({
  name: z
    .string({ required_error: "タグ名を入力してください" })
    .min(1, "タグ名を入力してください")
    .max(20, "タグ名は20文字以内で入力してください"),
});

type TagFormProps = {
  action: FormAction;
  defaultValues?: {
    id?: string;
    name: string;
  };
  lastResult?: SubmissionResult;
};

export function TagForm({ action, defaultValues, lastResult }: TagFormProps) {
  const [form, fields] = useForm({
    constraint: getZodConstraint(formSchema),
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: formSchema }),
    defaultValue: {
      name: defaultValues?.name ?? "",
    },
  });

  return (
    <Form {...getFormProps(form)} action={action}>
      <div className="space-y-4">
        {defaultValues?.id && (
          <input type="hidden" name="id" value={defaultValues.id} />
        )}
        <FormField>
          <FormLabel htmlFor={fields.name.id} required>
            名前
          </FormLabel>
          <FormControl field={fields.name}>
            <Input placeholder="例：固定費、サブスクリプション、旅行" />
          </FormControl>
          {fields.name.errors?.map((error) => (
            <FormErrorMessage key={error} id={fields.name.errorId}>
              {error}
            </FormErrorMessage>
          ))}
        </FormField>
        <Button type="submit" className="w-full">
          {defaultValues?.id ? "更新" : "保存"}
        </Button>
      </div>
    </Form>
  );
}
