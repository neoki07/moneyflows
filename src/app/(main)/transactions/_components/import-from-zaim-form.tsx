import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint } from "@conform-to/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormAction,
  FormErrorMessage,
  FormField,
  FormLabel,
} from "@/components/ui/form-conform";

const formSchema = z.object({
  file: z.array(z.instanceof(File)),
});

type ImportFromZaimFormProps = {
  action: FormAction;
};

export const ImportFromZaimForm = ({ action }: ImportFromZaimFormProps) => {
  const [form, fields] = useForm({
    constraint: getZodConstraint(formSchema),
  });

  return (
    <Form {...getFormProps(form)} action={action}>
      <div className="space-y-4">
        <FormField>
          <FormLabel>CSVファイル</FormLabel>
          <input type="file" name={fields.file.name} accept="text/csv" />
          {fields.file.errors?.map((error) => (
            <FormErrorMessage key={error} id={fields.file.errorId}>
              {error}
            </FormErrorMessage>
          ))}
        </FormField>
        <Button type="submit" className="w-full">
          アップロード
        </Button>
      </div>
    </Form>
  );
};
