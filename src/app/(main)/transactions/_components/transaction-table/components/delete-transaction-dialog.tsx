import { Transaction } from "@/app/(main)/transactions/_lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DeepReadonly } from "@/types";

type DeleteTransactionDialogProps = DeepReadonly<{
  transaction: Transaction;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}>;

export function DeleteTransactionDialog({
  transaction,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteTransactionDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>収支を削除</AlertDialogTitle>
          <AlertDialogDescription>
            「{transaction.description}」を削除してもよろしいですか？
            <br />
            この操作は取り消せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={isDeleting}>
              キャンセル
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={onConfirm}
            >
              {isDeleting ? "削除中..." : "削除"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
