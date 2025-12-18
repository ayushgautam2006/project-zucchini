"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

/* ================= DATA TYPE ================= */

export type Payment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  registeredAt: string;
  status: "pending" | "processing" | "success" | "failed";
  amount: number;
};

/* ================= COLUMNS ================= */

export const columns: ColumnDef<Payment>[] = [
  /* ---------- NAME ---------- */
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium text-zinc-100">{row.getValue("name")}</span>,
  },

  /* ---------- EMAIL ---------- */
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 text-zinc-300 hover:text-white"
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="lowercase text-zinc-300">{row.getValue("email")}</span>,
  },

  /* ---------- PHONE ---------- */
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span className="tabular-nums text-zinc-300">{row.getValue("phone")}</span>,
  },

  /* ---------- COLLEGE ---------- */
  {
    accessorKey: "college",
    header: "College",
    cell: ({ row }) => <span className="text-zinc-400">{row.getValue("college")}</span>,
  },

  /* ---------- REGISTERED DATE ---------- */
  {
    accessorKey: "registeredAt",
    header: "Registered",
    cell: ({ row }) => {
      const date = new Date(row.getValue("registeredAt"));
      return <span className="text-zinc-400">{date.toLocaleDateString()}</span>;
    },
  },

  /* ---------- STATUS ---------- */
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const color =
        status === "success"
          ? "text-emerald-400"
          : status === "failed"
            ? "text-red-400"
            : status === "processing"
              ? "text-amber-400"
              : "text-zinc-400";

      return <span className={`capitalize font-medium ${color}`}>{status}</span>;
    },
  },
];
