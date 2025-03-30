import { SystemAdminSidebar } from "@/components/system-admin-sidebar"
import { SystemAdminReviews } from "@/components/system-admin-reviews"

export default function SystemAdminReviewsPage() {
  return (
    <div className="min-h-screen flex">
      <SystemAdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Gestión de Reseñas</h1>
        <SystemAdminReviews />
      </main>
    </div>
  )
}

