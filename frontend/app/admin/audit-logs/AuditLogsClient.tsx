"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

type AuditLog = {
  id: string;
  action: string;
  createdAt: string;
};

export default function AuditLogsClient({
  initialLogs,
}: {
  initialLogs: AuditLog[];
}) {
  const { data, isLoading, error } = useQuery<AuditLog[]>({
    queryKey: ["auditLogs"],
    initialData: initialLogs,
    queryFn: () => api.get<AuditLog[]>("/api/audit-logs"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return (
    <div>
      <div>Error loading audit logs</div>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );

  return (
    <div>
      {data?.map((log) => (
        <div key={log.id}>
          {log.action} — {new Date(log.createdAt).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
