"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

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

import { BulkActionBar } from "./components/bulk-action-bar";
import { Pagination } from "./components/pagination";
import { columns } from "./lib/columns";

type TransactionTablePresenterProps = DeepReadonly<{
  data: Transaction[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}>;

export function TransactionTablePresenter({
  data,
  totalCount,
  currentPage,
  pageSize,
}: TransactionTablePresenterProps) {
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    setRowSelection({});
  }, [currentPage]);

  const table = useReactTable({
    data: data as Transaction[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const { rows } = table.getRowModel();

  const handleEdit = () => {
    console.log("Edit selected rows", table.getSelectedRowModel().rows);
  };

  const handleDelete = () => {
    console.log("Delete selected rows", table.getSelectedRowModel().rows);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                  >
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
            {rows?.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: `${cell.column.getSize()}px` }}
                    >
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
                  className="h-32 text-center"
                >
                  データがありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {rows.length > 0 && (
        <div className="flex items-center justify-between">
          <Pagination
            totalCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      )}
      <BulkActionBar
        selectedCount={table.getSelectedRowModel().rows.length}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
