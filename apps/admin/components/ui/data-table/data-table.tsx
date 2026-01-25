"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./datapagination";
import { downloadCSV, extractHeadersFromTable } from "./export-utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage?: string;
  onRowClick?: (row: TData) => void;
  /** Enable export buttons for CSV and Excel download */
  exportable?: boolean;
  /** Filename for exported files (without extension) */
  exportFilename?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = "No users found.",
  onRowClick,
  exportable = false,
  exportFilename = "table-export",
}: DataTableProps<TData, TValue>) {
  /* hooks first */
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Export handlers
  const handleExportCSV = () => {
    const headers = extractHeadersFromTable(table);
    downloadCSV(data as Record<string, unknown>[], headers, exportFilename);
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="mx-auto w-full max-w-full rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg overflow-hidden">
        {/* ===== EXPORT TOOLBAR ===== */}
        {exportable && (
          <div className="flex items-center justify-end gap-2 border-b border-zinc-800 p-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="gap-2 border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        )}

        {/* ===== TABLE ===== */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-zinc-800 bg-zinc-900">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-xs uppercase tracking-wide text-zinc-100"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={`border-zinc-800 hover:bg-zinc-800/60 ${onRowClick ? "cursor-pointer" : ""}`}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 text-sm text-zinc-200">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-zinc-400 text-base">{emptyMessage}</span>
                      <span className="text-zinc-600 text-sm">
                        Try adjusting your search or filters
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="border-t border-zinc-800 p-4">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
