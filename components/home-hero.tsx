"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Compass } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCurrentLocation, getAddressFromCoordinates } from "@/lib/geolocation"

export function HomeHero() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [radius, setRadius] = useState("10")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLocationDetect = async () => {
    setIsLoading(true)
    setError("")

    try {
      const currentLocation = await getCurrentLocation()
      if (currentLocation) {
        setLocation(`${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`)

        // Intentar obtener la dirección, pero no bloquear si falla
        try {
          const address = await getAddressFromCoordinates(currentLocation.lat, currentLocation.lng)
          if (address) {
            setLocation(address)
          }
        } catch (addressErr) {
          console.log("No se pudo obtener la dirección, usando coordenadas")
        }
      } else {
        // Si getCurrentLocation devuelve null (no debería ocurrir con nuestra implementación actualizada)
        setLocation("Buenos Aires, Argentina")
        setError("No se pudo detectar tu ubicación. Usando ubicación predeterminada.")
      }
    } catch (err) {
      // Este bloque catch ahora es menos probable que se ejecute debido a los cambios en getCurrentLocation
      setLocation("Buenos Aires, Argentina")
      setError("No se pudo acceder a tu ubicación. Usando ubicación predeterminada.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    if (!location) {
      setError("Por favor, ingresa una ubicación")
      return
    }

    // En una implementación real, aquí pasaríamos los parámetros de búsqueda
    router.push(`/mapa?location=${encodeURIComponent(location)}&radius=${radius}`)
  }

  return (
    <div className="relative gray-gradient py-20">
      <div className="container mx-auto px-4 py-12 text-center relative z-10">
        <div className="mb-8 flex justify-center">
          <div className="relative h-24 md:h-32 w-auto">
            <Image
              src="/images/logo.png"
              alt="¿Dónde Salimos?"
              width={300}
              height={100}
              style={{
                maxHeight: "100%",
                width: "auto",
              }}
            />
          </div>
        </div>
        <p className="mt-6 text-xl max-w-3xl mx-auto text-black">
          Encuentra los mejores bares y boliches cerca de ti. Lee reseñas, haz reservas y organiza tus salidas de manera
          fácil y rápida.
        </p>
        <div className="mt-10 max-w-xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary" />
                  <Input
                    type="text"
                    placeholder="Ingresa tu ubicación"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>
                <Button
                  onClick={handleLocationDetect}
                  variant="outline"
                  disabled={isLoading}
                  className="bg-white hover:bg-gray-100 text-primary border-gray-300"
                >
                  {isLoading ? "Detectando..." : <Compass className="h-5 w-5" />}
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex items-center gap-2">
                <Select value={radius} onValueChange={setRadius}>
                  <SelectTrigger className="w-full text-gray-900 border-gray-300">
                    <SelectValue placeholder="Radio de búsqueda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="15">15 km</SelectItem>
                    <SelectItem value="20">20 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" /> Buscar lugares
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

