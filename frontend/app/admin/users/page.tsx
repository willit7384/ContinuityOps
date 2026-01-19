import UsersClient from "./UsersClient";

export default async function UsersPage() {
  const users = await fetch("http://localhost:5000/api/users", {
    cache: "no-store",
  }).then((res) => res.json());

  return <UsersClient initialUsers={users} />;
}
