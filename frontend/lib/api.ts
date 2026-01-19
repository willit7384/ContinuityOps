// frontend/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const api = {
  get: async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return res.json();
  },

  post: async <T>(path: string, body: unknown): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return res.json();
  },

  patch: async <T>(path: string, body: unknown): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return res.json();
  },

  del: async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return res.json();
  },
};
