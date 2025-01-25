"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { fetchTransactionTableData } from "@/app/(main)/transactions/_lib/fetch";
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
import { Pagination } from "./pagination";

type TransactionTableProps = DeepReadonly<{
  data: Transaction[];
  totalCount: number;
}>;

export function TransactionTable({
  data: initialData,
  totalCount,
}: TransactionTableProps) {
  const [currentPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { transactions } = await fetchTransactionTableData(currentPage, 10);
      setData(transactions);
    };

    if (currentPage > 1) {
      fetchData();
    }
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
      <div className="flex items-center justify-between">
        <BulkActionBar
          selectedCount={table.getSelectedRowModel().rows.length}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Pagination
          totalCount={totalCount}
          pageSize={10}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
