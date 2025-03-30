"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LocationMap } from "@/components/location-map"
import { PlacesFilter } from "@/components/places-filter"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, List } from "lucide-react"

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [viewMode, setViewMode] = useState<"map" | "list">("map")

  const handleLocationChange = (location: { lat: number; lng: number }) => {
    setUserLocation(location)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold">Explorar lugares</h1>
            <div className="flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "map" | "list")}>
                <TabsList>
                  <TabsTrigger value="map" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Mapa</span>
                  </TabsTrigger>
                  <TabsTrigger value="list" className="flex items-center gap-1">
                    <List className="h-4 w-4" />
                    <span>Lista</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <PlacesFilter type="all" />
            </div>
            <div className="md:col-span-3">
              <LocationMap initialLocation={userLocation || undefined} onLocationChange={handleLocationChange} />

              {viewMode === "map" ? (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Aquí irían las tarjetas de lugares cercanos */}
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Bar La Esquina</h3>
                      <p className="text-sm text-muted-foreground">A 1.2 km de tu ubicación</p>
                      <Button variant="link" className="p-0 h-auto mt-2" asChild>
                        <a href="/lugar/1">Ver detalles</a>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Boliche Noche</h3>
                      <p className="text-sm text-muted-foreground">A 4.1 km de tu ubicación</p>
                      <Button variant="link" className="p-0 h-auto mt-2" asChild>
                        <a href="/lugar/2">Ver detalles</a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="mt-6">
                  {/* Aquí iría el componente de lista de lugares */}
                  <p className="text-muted-foreground">Mostrando lugares cercanos a tu ubicación</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

