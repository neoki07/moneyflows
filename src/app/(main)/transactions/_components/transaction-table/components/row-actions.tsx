import { IconDots, IconTrash } from "@tabler/icons-react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeepReadonly } from "@/types";

import { deleteTransaction } from "../../../_actions/delete-transaction";

type RowActionsProps = DeepReadonly<{
  transactionId: string;
}>;

export function RowActions({ transactionId }: RowActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTransaction(transactionId);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <IconDots className="h-4 w-4" />
          <span className="sr-only">アクション</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-red-500 focus:bg-red-50 focus:text-red-500"
          disabled={isPending}
          onClick={handleDelete}
        >
          <IconTrash />
          削除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
