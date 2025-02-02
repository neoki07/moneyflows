import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Transaction } from "@/app/(main)/transactions/_lib/types";
import { Checkbox } from "@/components/ui/checkbox";

import { RowActions } from "../components/row-actions";

export const columns = [
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
    cell: ({ row }) => {
      return format(row.original.date, "yyyy/MM/dd");
    },
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
    cell: ({ row }) => {
      return row.original.category?.name ?? "";
    },
  },
  {
    accessorKey: "tags",
    header: "タグ",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <RowActions transaction={row.original} />;
    },
  },
] as const satisfies ColumnDef<Transaction>[];
