"use client";

import { IconTrash } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";

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

import { deleteDashboard } from "../actions/delete-dashboard";
import { NavItem } from "./nav-item";

type DashboardListItemProps = {
  id: string;
  name: string;
};

export function DashboardListItem({ id, name }: DashboardListItemProps) {
  const pathname = usePathname();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await deleteDashboard(id, pathname);
        setIsDeleteDialogOpen(false);
      } catch (error) {
        console.error("Failed to delete dashboard:", error);
      }
    });
  };

  return (
    <li className="group relative">
      <NavItem
        link={`/dashboards/${id}`}
        rightElement={
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsDeleteDialogOpen(true);
            }}
            className="absolute right-3 hidden cursor-pointer rounded-md text-slate-500 group-hover:inline-block hover:text-slate-700"
          >
            <IconTrash size={16} />
          </button>
        }
      >
        {name}
      </NavItem>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ダッシュボードの削除</AlertDialogTitle>
            <AlertDialogDescription>
              「{name}」を削除してもよろしいですか？
              <br />
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending}>
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
