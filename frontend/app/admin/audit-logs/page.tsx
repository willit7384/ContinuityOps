"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type AuditLog = {
  id: string;
  action: string;
  createdAt: string;
  actor?: {
    email: string;
  };
};

type AuditLogResponse = {
  data: AuditLog[];
};

export default function AuditLogsPage() {
  const { data, isLoading, error } = useQuery<AuditLogResponse>({
    queryKey: ["auditLogs"],
    queryFn: () => api.get<AuditLogResponse>("/api/admin/audit-logs"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading audit logs</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>

      {data?.data.map((log) => (
        <div key={log.id}>
          {log.action} —{" "}
          {new Date(log.createdAt).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
