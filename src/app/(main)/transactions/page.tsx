import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Input } from "@/components/ui/input";
import { DeepReadonly } from "@/types";

import { AddTransactionButton } from "./_components/add-transaction-button";
import { TransactionTable } from "./_components/transaction-table";
import { TransactionTableSkeleton } from "./_components/transaction-table-skeleton";

type PageProps = DeepReadonly<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>;

async function SearchForm({ q }: { q?: string }) {
  async function search(formData: FormData) {
    "use server";

    const query = formData.get("q");
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set("q", query.toString());
    }
    redirect(`/transactions?${searchParams.toString()}`);
  }

  return (
    <form action={search} className="flex-1">
      <Input name="q" placeholder="キーワード検索" defaultValue={q ?? ""} />
    </form>
  );
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : undefined;

  return (
    <div className="grid grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">収支</h1>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SearchForm q={query} />
          <div>
            <AddTransactionButton />
          </div>
        </div>
        <Suspense fallback={<TransactionTableSkeleton />}>
          <TransactionTable searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
