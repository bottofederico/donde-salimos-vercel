import { SystemAdminSidebar } from "@/components/system-admin-sidebar"
import { SystemAdminNews } from "@/components/system-admin-news"

export default function SystemAdminNewsPage() {
  return (
    <div className="min-h-screen flex">
      <SystemAdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Gestión de Novedades</h1>
        <SystemAdminNews />
      </main>
    </div>
  )
}

