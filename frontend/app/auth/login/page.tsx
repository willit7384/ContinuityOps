"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

type LoginResponse = {
  token: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await api.post<LoginResponse>("/api/admin/auth/login", {
        email,
        password,
      });

      // api.post returns the JSON body directly
      localStorage.setItem("token", res.token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <input
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
