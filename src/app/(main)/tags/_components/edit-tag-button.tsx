import { IconEdit } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function EditTagButton() {
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
          <DialogTitle>タグの編集</DialogTitle>
        </DialogHeader>
        {/* TODO: add tag form */}
      </DialogContent>
    </Dialog>
  );
}
