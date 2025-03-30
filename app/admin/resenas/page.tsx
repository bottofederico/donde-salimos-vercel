import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminReviews } from "@/components/admin-reviews"

export default function AdminReviewsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Gestión de Reseñas</h1>
          <AdminReviews />
        </main>
      </div>
      <Footer />
    </div>
  )
}

