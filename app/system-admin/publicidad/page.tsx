import { SystemAdminSidebar } from "@/components/system-admin-sidebar"
import { SystemAdminAdvertising } from "@/components/system-admin-advertising"

export default function SystemAdminAdvertisingPage() {
  return (
    <div className="min-h-screen flex">
      <SystemAdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Gestión de Publicidad</h1>
        <SystemAdminAdvertising />
      </main>
    </div>
  )
}

