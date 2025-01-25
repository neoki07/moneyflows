"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  tag: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: "日付",
  },
  {
    accessorKey: "description",
    header: "内容",
  },
  {
    accessorKey: "amount",
    header: "金額",
  },
  {
    accessorKey: "category",
    header: "カテゴリー",
  },
  {
    accessorKey: "tag",
    header: "タグ",
  },
];
