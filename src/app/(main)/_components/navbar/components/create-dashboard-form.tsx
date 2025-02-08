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
    .string({ required_error: "ダッシュボード名を入力してください" })
    .min(1, "ダッシュボード名を入力してください")
    .max(20, "ダッシュボード名は20文字以内で入力してください"),
});

type CreateDashboardFormProps = {
  action: FormAction;
  defaultValues?: {
    name: string;
  };
  lastResult?: SubmissionResult;
  isPending?: boolean;
};

export function CreateDashboardForm({
  action,
  defaultValues,
  lastResult,
  isPending,
}: CreateDashboardFormProps) {
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
        <FormField>
          <FormLabel htmlFor={fields.name.id} required>
            名前
          </FormLabel>
          <FormControl field={fields.name}>
            <Input />
          </FormControl>
          {fields.name.errors?.map((error) => (
            <FormErrorMessage key={error} id={fields.name.errorId}>
              {error}
            </FormErrorMessage>
          ))}
        </FormField>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "保存中..." : "保存"}
        </Button>
      </div>
    </Form>
  );
}
