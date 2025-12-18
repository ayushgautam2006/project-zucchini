"use client";
import { columns, Payment } from "@/components/ui/data-table/columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Users } from "lucide-react";
import Header from "@/components/header";
import { useState } from "react";
import { tempUserData } from "@/config";

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>(tempUserData);

  return (
    <div className="min-h-screen">
      <Header
        title="Registrations"
        subtitle="Total Registerations: XX | Female : XX | Male : XX"
        Icon={Users}
      />

      <main className="mx-auto px-6 py-8">
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
}
