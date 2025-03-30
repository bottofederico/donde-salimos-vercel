import { SystemAdminSidebar } from "@/components/system-admin-sidebar"
import { SystemAdminDashboard } from "@/components/system-admin-dashboard"

export default function SystemAdminDashboardPage() {
  return (
    <div className="min-h-screen flex">
      <SystemAdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración del Sistema</h1>
        <SystemAdminDashboard />
      </main>
    </div>
  )
}

