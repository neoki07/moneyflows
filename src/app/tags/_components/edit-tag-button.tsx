import { Button } from "@/components/ui/button";
import { IconPencil } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TagForm } from "./tag-form";

export function EditTagButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconPencil />
          <span className="sr-only">編集</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>タグの編集</DialogTitle>
        </DialogHeader>
        <TagForm />
      </DialogContent>
    </Dialog>
  );
}
