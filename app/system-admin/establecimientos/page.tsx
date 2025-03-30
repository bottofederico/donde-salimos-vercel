import { SystemAdminSidebar } from "@/components/system-admin-sidebar"
import { SystemAdminEstablishments } from "@/components/system-admin-establishments"

export default function SystemAdminEstablishmentsPage() {
  return (
    <div className="min-h-screen flex">
      <SystemAdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Gestión de Establecimientos</h1>
        <SystemAdminEstablishments />
      </main>
    </div>
  )
}

