"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Loader2, Compass } from "lucide-react"
import { getCurrentLocation, getAddressFromCoordinates, getCoordinatesFromAddress } from "@/lib/geolocation"

interface LocationMapProps {
  initialLocation?: { lat: number; lng: number }
  onLocationChange?: (location: { lat: number; lng: number }) => void
}

export function LocationMap({ initialLocation, onLocationChange }: LocationMapProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(initialLocation || null)
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (location && !address) {
      // Si tenemos ubicación pero no dirección, obtener la dirección
      const fetchAddress = async () => {
        const addressResult = await getAddressFromCoordinates(location.lat, location.lng)
        if (addressResult) {
          setAddress(addressResult)
        }
      }

      fetchAddress()
    }
  }, [location, address])

  const handleDetectLocation = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const currentLocation = await getCurrentLocation()
      if (currentLocation) {
        setLocation(currentLocation)
        if (onLocationChange) {
          onLocationChange(currentLocation)
        }

        // Limpiar la dirección para que se actualice en el useEffect
        setAddress("")
      }
    } catch (err) {
      setError("No se pudo obtener tu ubicación. Por favor, verifica los permisos de ubicación.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchAddress = async () => {
    if (!address.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const coordinates = await getCoordinatesFromAddress(address)
      if (coordinates) {
        setLocation(coordinates)
        if (onLocationChange) {
          onLocationChange(coordinates)
        }
      } else {
        setError("No se encontró la dirección. Intenta con otra.")
      }
    } catch (err) {
      setError("Error al buscar la dirección.")
    } finally {
      setIsLoading(false)
    }
  }

  // Actualizar el manejo de errores en handleLocationDetect
  const handleLocationDetect = async () => {
    setIsLoading(true)
    setError("")

    try {
      const currentLocation = await getCurrentLocation()
      if (currentLocation) {
        setLocation(currentLocation)
        if (onLocationChange) {
          onLocationChange(currentLocation)
        }

        // Intentar obtener la dirección, pero no bloquear si falla
        try {
          const address = await getAddressFromCoordinates(currentLocation.lat, currentLocation.lng)
          if (address) {
            setAddress(address)
          } else {
            setAddress(`${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`)
          }
        } catch (addressErr) {
          setAddress(`${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`)
        }
      } else {
        // Esto no debería ocurrir con nuestra implementación actualizada
        const defaultLocation = { lat: -34.6037, lng: -58.3816 } // Buenos Aires
        setLocation(defaultLocation)
        if (onLocationChange) {
          onLocationChange(defaultLocation)
        }
        setAddress("Buenos Aires, Argentina (ubicación predeterminada)")
        setError("No se pudo acceder a tu ubicación. Usando ubicación predeterminada.")
      }
    } catch (err) {
      // Este bloque catch ahora es menos probable que se ejecute
      const defaultLocation = { lat: -34.6037, lng: -58.3816 } // Buenos Aires
      setLocation(defaultLocation)
      if (onLocationChange) {
        onLocationChange(defaultLocation)
      }
      setAddress("Buenos Aires, Argentina (ubicación predeterminada)")
      setError("No se pudo acceder a tu ubicación. Usando ubicación predeterminada.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-gray-200 shadow-md overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Input
                placeholder="Ingresa una dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10 pr-10 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-primary focus:ring-primary"
                onKeyDown={(e) => e.key === "Enter" && handleSearchAddress()}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full text-gray-500 hover:text-primary"
                onClick={handleSearchAddress}
                disabled={isLoading}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={handleLocationDetect}
              disabled={isLoading}
              className="flex items-center gap-2 bg-white hover:bg-gray-100 text-primary border-gray-300"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Compass className="h-4 w-4" />}
              <span className="sr-only md:not-sr-only md:ml-2">Detectar ubicación</span>
            </Button>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="relative h-[300px] w-full bg-muted rounded-md overflow-hidden">
            {/* Aquí iría un mapa real con la API de Google Maps */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              {location ? (
                <div className="text-center">
                  <div className="map-pin-pulse">
                    <MapPin className="h-8 w-8 text-primary mx-auto" fill="currentColor" strokeWidth={1.5} />
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-700">
                    Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                  </p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">Selecciona una ubicación</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

