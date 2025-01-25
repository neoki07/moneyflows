"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { Transaction } from "@/app/(main)/transactions/_lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeepReadonly } from "@/types";

import { BulkActionBar } from "./bulk-action-bar";
import { columns } from "./columns";

type TransactionTableProps = DeepReadonly<{
  data: Transaction[];
}>;

export function TransactionTable({ data }: TransactionTableProps) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data as Transaction[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const handleEdit = () => {
    console.log("Edit selected rows", table.getSelectedRowModel().rows);
  };

  const handleDelete = () => {
    console.log("Delete selected rows", table.getSelectedRowModel().rows);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <BulkActionBar
        selectedCount={table.getSelectedRowModel().rows.length}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
