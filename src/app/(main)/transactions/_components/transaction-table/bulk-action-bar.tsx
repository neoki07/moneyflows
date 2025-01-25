"use client";

import { IconEdit, IconTrash } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";

type BulkActionBarProps = {
  selectedCount: number;
  onEdit: () => void;
  onDelete: () => void;
};

export function BulkActionBar({
  selectedCount,
  onEdit,
  onDelete,
}: BulkActionBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="fixed top-1 left-[45%] z-50 flex w-[30rem] items-center gap-6 rounded-xl border bg-white p-3 shadow-lg"
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
            <Button variant="destructive" size="sm" onClick={onDelete}>
              <IconTrash />
              まとめて削除
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
