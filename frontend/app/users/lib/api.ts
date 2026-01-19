export const api = {
  get: async <T>(path: string) => {
    const res = await fetch(path);
    return (await res.json()) as T;
  },

  post: async <T>(path: string, body: any) => {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await res.json()) as T;
  },

  patch: async <T>(path: string, body: any) => {
    const res = await fetch(path, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await res.json()) as T;
  },

  delete: async <T>(path: string) => {
    const res = await fetch(path, { method: "DELETE" });
    return (await res.json()) as T;
  },
};
