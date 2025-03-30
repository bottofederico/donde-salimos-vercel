import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PlacesList } from "@/components/places-list"
import { PlacesFilter } from "@/components/places-filter"

export default function BarsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6">Bares</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <PlacesFilter type="bar" />
            </div>
            <div className="md:col-span-3">
              <PlacesList type="bar" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

