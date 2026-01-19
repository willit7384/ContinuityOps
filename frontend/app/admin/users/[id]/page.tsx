import { api } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
};

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await api.get<User>(`/api/users/${params.id}`);

  return (
    <div>
      <h1>User Detail</h1>
      <div>ID: {user.id}</div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
    </div>
  );
}
