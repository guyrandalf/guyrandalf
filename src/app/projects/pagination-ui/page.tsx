import { db } from "@/lib/db";
import PaginatedUsers from "@/components/pagination/paginated-users";

export default async function PaginationPage() {
  const totalUsers = await db.user.count();
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
      <h1 className="text-4xl font-bold mb-8">Pagination Demo</h1>
      <PaginatedUsers initialUsers={users} totalUsers={totalUsers} />
    </div>
  );
}
