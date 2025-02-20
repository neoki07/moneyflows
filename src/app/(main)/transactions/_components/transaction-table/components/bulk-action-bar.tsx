import { IconEdit, IconTrash } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { deleteTransactions } from "@/app/(main)/transactions/_actions/delete-transactions";
import { Transaction } from "@/app/(main)/transactions/_lib/types";
import { Button } from "@/components/ui/button";

import { DeleteTransactionsDialog } from "./delete-transactions-dialog";

type BulkActionBarProps = {
  selectedTransactions: Transaction[];
  onEdit: () => void;
  onDeleteSuccess?: () => void;
};

export function BulkActionBar({
  selectedTransactions,
  onEdit,
  onDeleteSuccess,
}: BulkActionBarProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const ids = selectedTransactions.map((transaction) => transaction.id);
      await deleteTransactions(ids);
      onDeleteSuccess?.();
    } catch (error) {
      console.error("Failed to delete transactions:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const selectedCount = selectedTransactions.length;

  return (
    <>
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-5 left-1/2 z-50 flex w-full max-w-xl -translate-x-1/2 items-center gap-6 rounded-xl border bg-white p-3 shadow-lg"
          >
            <p className="flex-1 pl-2 text-sm font-medium text-slate-700">
              <span className="mr-0.5 font-semibold">{selectedCount}</span>
              件の収支を選択中
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <IconEdit />
                まとめて編集
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <IconTrash />
                まとめて削除
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteTransactionsDialog
        selectedCount={selectedCount}
        isOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
