import { SystemAdminSidebar } from "@/components/system-admin-sidebar"
import { SystemAdminSettings } from "@/components/system-admin-settings"

export default function SystemAdminSettingsPage() {
  return (
    <div className="min-h-screen flex">
      <SystemAdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
        <SystemAdminSettings />
      </main>
    </div>
  )
}

