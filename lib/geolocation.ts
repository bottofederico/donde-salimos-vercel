// Servicio para manejar la geolocalización

// Función para obtener la ubicación actual del usuario
export async function getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
  // Verificar si la API de geolocalización está disponible
  if (!navigator || !navigator.geolocation) {
    console.log("Geolocalización no soportada por este navegador.")
    // Devolver una ubicación predeterminada en lugar de rechazar la promesa
    return { lat: -34.6037, lng: -58.3816 } // Buenos Aires por defecto
  }

  try {
    // Usar una promesa para manejar la geolocalización
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos),
        (err) => {
          console.error("Error al obtener la ubicación:", err.message)
          reject(err)
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      )
    })

    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
  } catch (error) {
    console.log("Fallback a ubicación predeterminada debido a error de geolocalización")
    // En caso de error, devolver una ubicación predeterminada
    return { lat: -34.6037, lng: -58.3816 } // Buenos Aires por defecto
  }
}

// Función para calcular la distancia entre dos puntos (fórmula de Haversine)
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

// Función auxiliar para convertir grados a radianes
function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180
}

// Función para filtrar lugares por distancia
export function filterPlacesByDistance(
  places: any[],
  userLocation: { lat: number; lng: number },
  maxDistance: number,
): any[] {
  return places.filter((place) => {
    const distance = calculateDistance(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng)
    return distance <= maxDistance
  })
}

// Función para obtener la dirección a partir de coordenadas (geocodificación inversa)
export async function getAddressFromCoordinates(lat: number, lng: number): Promise<string | null> {
  try {
    // En una implementación real, aquí se haría una llamada a la API de Google Maps
    // Para este ejemplo, simulamos una respuesta
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulamos diferentes direcciones según las coordenadas
    if (lat > 0 && lng > 0) {
      return "Av. Santa Fe 1234, CABA, Argentina"
    } else if (lat > 0 && lng < 0) {
      return "Av. Corrientes 456, CABA, Argentina"
    } else if (lat < 0 && lng > 0) {
      return "Av. Cabildo 789, CABA, Argentina"
    } else {
      return "Av. Rivadavia 101, CABA, Argentina"
    }
  } catch (error) {
    console.error("Error al obtener la dirección:", error)
    return null
  }
}

// Función para obtener coordenadas a partir de una dirección (geocodificación)
export async function getCoordinatesFromAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    // En una implementación real, aquí se haría una llamada a la API de Google Maps
    // Para este ejemplo, simulamos una respuesta
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulamos diferentes coordenadas según la dirección
    if (address.toLowerCase().includes("santa fe")) {
      return { lat: 34.5956, lng: -58.4233 }
    } else if (address.toLowerCase().includes("corrientes")) {
      return { lat: 34.6037, lng: -58.3816 }
    } else if (address.toLowerCase().includes("cabildo")) {
      return { lat: 34.5623, lng: -58.4629 }
    } else {
      return { lat: 34.6169, lng: -58.3722 }
    }
  } catch (error) {
    console.error("Error al obtener las coordenadas:", error)
    return null
  }
}

