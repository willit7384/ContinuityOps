// frontend/lib/requireAdmin.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  if (!token) {
    redirect("/auth/login");
  }
}
