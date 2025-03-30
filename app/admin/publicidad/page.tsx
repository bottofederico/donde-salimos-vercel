import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminAdvertising } from "@/components/admin-advertising"

export default function AdminAdvertisingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Gestión de Publicidad</h1>
          <AdminAdvertising />
        </main>
      </div>
      <Footer />
    </div>
  )
}

