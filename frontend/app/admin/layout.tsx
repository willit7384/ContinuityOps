// frontend/app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="font-bold text-xl mb-6">ContinuityOps Admin</h2>

        <nav className="space-y-2">
          <a href="/admin/dashboard" className="block p-2 rounded hover:bg-gray-100">
            Dashboard
          </a>
          <a href="/admin/users" className="block p-2 rounded hover:bg-gray-100">
            Users
          </a>
          <a href="/admin/audit-logs" className="block p-2 rounded hover:bg-gray-100">
            Audit Logs
          </a>
          <a href="/admin/admissions" className="block p-2 rounded hover:bg-gray-100">
            Admissions
          </a>
          <a href="/admin/enrollment" className="block p-2 rounded hover:bg-gray-100">
            Enrollment
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
