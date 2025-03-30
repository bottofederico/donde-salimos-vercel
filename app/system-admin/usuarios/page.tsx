import { SystemAdminSidebar } from "@/components/system-admin-sidebar"
import { SystemAdminUsers } from "@/components/system-admin-users"

export default function SystemAdminUsersPage() {
  return (
    <div className="min-h-screen flex">
      <SystemAdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>
        <SystemAdminUsers />
      </main>
    </div>
  )
}

