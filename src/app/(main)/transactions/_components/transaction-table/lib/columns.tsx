import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Transaction } from "@/app/(main)/transactions/_lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { formatAmount } from "@/lib/amount";
import { cn } from "@/lib/utils";

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
    cell: ({ row }) => {
      const amount =
        row.original.type === "expense"
          ? -row.original.amount
          : row.original.amount;
      return (
        <span
          className={cn(
            row.original.type === "expense"
              ? "text-red-500"
              : "text-emerald-500",
          )}
        >
          {formatAmount(amount)}
        </span>
      );
    },
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
    cell: ({ row }) => {
      return row.original.tags.map((tag) => tag.name).join(", ");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <RowActions transaction={row.original} />;
    },
    size: 64,
  },
] as const satisfies ColumnDef<Transaction>[];
