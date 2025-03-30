import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminDashboardOverview } from "@/components/admin-dashboard-overview"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
          <AdminDashboardOverview />
        </main>
      </div>
      <Footer />
    </div>
  )
}

