"use client";

import { Button } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

interface BulkActionBarProps {
  selectedCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

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
          className="fixed top-1 left-[45%] bg-white rounded-xl shadow-lg border p-3 flex items-center gap-6 z-50 w-[30rem]"
        >
          <p className="text-sm text-slate-700 pl-2 font-medium flex-1">
            <span className="font-semibold mr-0.5">{selectedCount}</span>
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
