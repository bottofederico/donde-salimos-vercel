import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminReservations } from "@/components/admin-reservations"

export default function AdminReservationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Gestión de Reservas</h1>
          <AdminReservations />
        </main>
      </div>
      <Footer />
    </div>
  )
}

