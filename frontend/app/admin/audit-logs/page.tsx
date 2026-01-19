import AuditLogsClient from "./AuditLogsClient";

export default async function AuditLogsPage() {
  const logs = await fetch("http://localhost:5000/api/audit-logs", {
    cache: "no-store",
  }).then((res) => res.json());

  return <AuditLogsClient initialLogs={logs} />;
}
