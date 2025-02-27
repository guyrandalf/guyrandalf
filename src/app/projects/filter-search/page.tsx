import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import SearchAndFilter from "@/components/search-filter/search-filter";

export default async function SearchPage() {
  const users = await db.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Search and Filter Demo</h1>
      <SearchAndFilter initialUsers={users} />
    </div>
  );
}
