// frontend/app/admin/audit-logs/page.tsx
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type AuditLog = {
  id: string;
  action: string;
  createdAt: string;
};

export default function AuditLogsPage() {
  const { data, isLoading, error } = useQuery<AuditLog[]>({
    queryKey: ["auditLogs"],
    queryFn: () => api.get<AuditLog[]>("/api/admin/audit-logs"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>

      {data?.map((log) => (
        <div key={log.id} className="p-3 bg-white rounded shadow mb-2">
          <div className="font-bold">{log.action}</div>
          <div className="text-gray-500">{log.createdAt}</div>
        </div>
      ))}
    </div>
  );
}
