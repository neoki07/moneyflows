"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
  useForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "カテゴリー名を入力してください")
    .max(20, "カテゴリー名は20文字以内で入力してください"),
});

export type FormValues = z.infer<typeof formSchema>;

type CategoryFormProps = {
  onSubmit: (values: FormValues) => void;
  error?: string;
  disabled?: boolean;
};

export function CategoryForm({ onSubmit, error, disabled }: CategoryFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <FormProvider {...form}>
      <Form
        control={form.control}
        className="space-y-6"
        onSubmit={({ data }) => onSubmit(data)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>名前</FormLabel>
              <FormControl>
                <Input placeholder="例：食費、交通費、給料" {...field} />
              </FormControl>
              <FormMessage>{error}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={disabled}>
          保存
        </Button>
      </Form>
    </FormProvider>
  );
}
