import { IconEdit } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CategoryForm, FormValues } from "./category-form";

export function EditCategoryButton() {
  const handleSubmit = async (values: FormValues) => {
    console.log({ values });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconEdit />
          <span className="sr-only">編集</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>カテゴリーの編集</DialogTitle>
        </DialogHeader>
        <CategoryForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
