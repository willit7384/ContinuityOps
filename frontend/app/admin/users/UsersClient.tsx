"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function UsersClient({ initialUsers }: { initialUsers: User[] }) {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    initialData: initialUsers,
    queryFn: () => api.get<User[]>("/api/users"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {data?.map((user) => (
        <div key={user.id} className="p-3 bg-white rounded shadow mb-2">
          <Link href={`/admin/users/${user.id}`}>
            <div className="font-bold">{user.name}</div>
            <div className="text-gray-500">{user.email}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
