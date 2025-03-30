"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Loader2 } from "lucide-react"
import { loadGoogleMapsScript, initMap, addMarker, geocodeAddress, reverseGeocode } from "@/lib/google-maps"

interface GoogleMapProps {
  initialLocation?: { lat: number; lng: number }
  onLocationChange?: (location: { lat: number; lng: number }) => void
  places?: Array<{
    id: number
    name: string
    location: { lat: number; lng: number }
    type: string
  }>
  height?: string
}

export function GoogleMap({ initialLocation, onLocationChange, places = [], height = "400px" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Cargar el script de Google Maps
  useEffect(() => {
    const loadScript = async () => {
      try {
        await loadGoogleMapsScript()
        setScriptLoaded(true)
      } catch (err) {
        setError("No se pudo cargar Google Maps. Por favor, verifica tu conexión a internet.")
      }
    }

    loadScript()
  }, [])

  // Inicializar el mapa una vez que el script esté cargado
  useEffect(() => {
    if (!scriptLoaded || !mapRef.current) return

    const defaultLocation = initialLocation || { lat: -34.6037, lng: -58.3816 } // Buenos Aires por defecto
    const newMap = initMap("google-map", defaultLocation)
    setMap(newMap)

    // Agregar marcador para la ubicación inicial
    const marker = addMarker(newMap, defaultLocation)
    setMarkers([marker])

    // Obtener la dirección de la ubicación inicial
    const getAddress = async () => {
      const addressResult = await reverseGeocode(defaultLocation.lat, defaultLocation.lng)
      if (addressResult) {
        setAddress(addressResult)
      }
    }

    getAddress()

    // Agregar listener para clicks en el mapa
    newMap.addListener("click", (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return

      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }

      // Actualizar marcador
      markers.forEach((marker) => marker.setMap(null))
      const newMarker = addMarker(newMap, newLocation)
      setMarkers([newMarker])

      // Notificar cambio de ubicación
      if (onLocationChange) {
        onLocationChange(newLocation)
      }

      // Obtener dirección
      reverseGeocode(newLocation.lat, newLocation.lng).then((addressResult) => {
        if (addressResult) {
          setAddress(addressResult)
        }
      })
    })

    // Agregar marcadores para los lugares
    if (places.length > 0 && map) {
      const placeMarkers = places.map((place) => {
        const marker = addMarker(newMap, place.location, place.name)

        // Agregar infowindow para mostrar información del lugar
        const infowindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h3 style="font-weight: bold; margin-bottom: 5px;">${place.name}</h3>
              <p>${place.type}</p>
              <a href="/lugar/${place.id}" style="color: blue; text-decoration: underline;">Ver detalles</a>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infowindow.open(newMap, marker)
        })

        return marker
      })

      setMarkers((prev) => [...prev, ...placeMarkers])

      // Ajustar el zoom para mostrar todos los marcadores
      if (placeMarkers.length > 0) {
        const bounds = new google.maps.LatLngBounds()
        placeMarkers.forEach((marker) => {
          bounds.extend(marker.getPosition()!)
        })
        newMap.fitBounds(bounds)
      }
    }

    return () => {
      // Limpiar marcadores al desmontar
      markers.forEach((marker) => marker.setMap(null))
    }
  }, [scriptLoaded, initialLocation, places, map, markers])

  // Modificar el método handleDetectLocation para manejar mejor los errores
  const handleDetectLocation = () => {
    if (!map) return

    setIsLoading(true)
    setError(null)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          // Actualizar mapa y marcador
          map.setCenter(currentLocation)
          markers.forEach((marker) => marker.setMap(null))
          const newMarker = addMarker(map, currentLocation)
          setMarkers([newMarker])

          // Notificar cambio de ubicación
          if (onLocationChange) {
            onLocationChange(currentLocation)
          }

          // Obtener dirección
          const addressResult = await reverseGeocode(currentLocation.lat, currentLocation.lng)
          if (addressResult) {
            setAddress(addressResult)
          }

          setIsLoading(false)
        },
        (error) => {
          console.error("Error de geolocalización:", error)

          // Usar una ubicación predeterminada en caso de error
          const defaultLocation = { lat: -34.6037, lng: -58.3816 } // Buenos Aires

          // Actualizar mapa y marcador con la ubicación predeterminada
          map.setCenter(defaultLocation)
          markers.forEach((marker) => marker.setMap(null))
          const newMarker = addMarker(map, defaultLocation)
          setMarkers([newMarker])

          // Notificar cambio de ubicación
          if (onLocationChange) {
            onLocationChange(defaultLocation)
          }

          setAddress("Buenos Aires, Argentina (ubicación predeterminada)")
          setError("No se pudo acceder a tu ubicación. Usando ubicación predeterminada.")
          setIsLoading(false)
        },
      )
    } else {
      setError("Tu navegador no soporta geolocalización.")
      setIsLoading(false)
    }
  }

  const handleSearchAddress = async () => {
    if (!map || !address.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const coordinates = await geocodeAddress(address)

      if (coordinates) {
        // Actualizar mapa y marcador
        map.setCenter(coordinates)
        map.setZoom(15)
        markers.forEach((marker) => marker.setMap(null))
        const newMarker = addMarker(map, coordinates)
        setMarkers([newMarker])

        // Notificar cambio de ubicación
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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Ingresa una dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pr-10 text-gray-900 placeholder:text-gray-500"
                onKeyDown={(e) => e.key === "Enter" && handleSearchAddress()}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={handleSearchAddress}
                disabled={isLoading || !address.trim()}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" onClick={handleDetectLocation} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
              <span className="sr-only md:not-sr-only md:ml-2">Detectar ubicación</span>
            </Button>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <div id="google-map" ref={mapRef} style={{ height, width: "100%" }} className="rounded-md overflow-hidden">
            {!scriptLoaded && (
              <div className="h-full w-full flex items-center justify-center bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

