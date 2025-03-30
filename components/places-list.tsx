import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Music, Utensils, Users } from "lucide-react"

// Datos de ejemplo para los lugares
const placesData = {
  bar: [
    {
      id: 1,
      name: "Bar La Esquina",
      type: "Bar",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300",
      location: "Palermo, Buenos Aires",
      distance: "1.2 km",
      description: "Un bar acogedor con excelente música y ambiente.",
      features: ["Música en vivo", "Comida", "Espacio al aire libre"],
      openHours: "18:00 - 02:00",
    },
    {
      id: 3,
      name: "Pub Irlandés",
      type: "Bar",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      location: "San Telmo, Buenos Aires",
      distance: "3.5 km",
      description: "Auténtica experiencia irlandesa con gran selección de cervezas.",
      features: ["Comida", "Deportes en vivo"],
      openHours: "17:00 - 04:00",
    },
    {
      id: 5,
      name: "Café del Arte",
      type: "Bar",
      rating: 4.3,
      image: "/placeholder.svg?height=200&width=300",
      location: "Recoleta, Buenos Aires",
      distance: "2.8 km",
      description: "Bar cultural con exposiciones de arte y música acústica.",
      features: ["Música en vivo", "Exposiciones", "Café de especialidad"],
      openHours: "10:00 - 00:00",
    },
    {
      id: 7,
      name: "Cervecería Artesanal",
      type: "Bar",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      location: "Palermo, Buenos Aires",
      distance: "1.8 km",
      description: "Amplia selección de cervezas artesanales y comida gourmet.",
      features: ["Cerveza artesanal", "Comida", "Terraza"],
      openHours: "16:00 - 02:00",
    },
  ],
  boliche: [
    {
      id: 2,
      name: "Boliche Noche",
      type: "Boliche",
      rating: 4.2,
      image: "/placeholder.svg?height=200&width=300",
      location: "Recoleta, Buenos Aires",
      distance: "4.1 km",
      description: "El mejor lugar para bailar toda la noche.",
      features: ["DJ internacional", "Varios ambientes", "VIP"],
      openHours: "00:00 - 06:00",
    },
    {
      id: 4,
      name: "Club Nocturno",
      type: "Boliche",
      rating: 4.0,
      image: "/placeholder.svg?height=200&width=300",
      location: "Puerto Madero, Buenos Aires",
      distance: "5.3 km",
      description: "Música electrónica y ambiente exclusivo.",
      features: ["Electrónica", "Terraza", "Barra premium"],
      openHours: "23:30 - 05:30",
    },
    {
      id: 6,
      name: "Disco Retro",
      type: "Boliche",
      rating: 4.4,
      image: "/placeholder.svg?height=200&width=300",
      location: "San Telmo, Buenos Aires",
      distance: "3.7 km",
      description: "Lo mejor de la música de los 80s y 90s.",
      features: ["Música retro", "Karaoke", "Shows en vivo"],
      openHours: "22:00 - 05:00",
    },
    {
      id: 8,
      name: "Club Urbano",
      type: "Boliche",
      rating: 4.1,
      image: "/placeholder.svg?height=200&width=300",
      location: "Palermo, Buenos Aires",
      distance: "2.2 km",
      description: "Música urbana, hip hop y reggaeton.",
      features: ["Urbano", "Hip hop", "Reggaeton"],
      openHours: "23:00 - 06:00",
    },
  ],
}

export function PlacesList({ type }) {
  const places = placesData[type] || []

  const getFeatureIcon = (feature) => {
    if (feature.includes("Música")) return <Music className="h-4 w-4" />
    if (feature.includes("Comida")) return <Utensils className="h-4 w-4" />
    return <Users className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Mostrando {places.length} resultados</p>
        <select className="border rounded p-2 text-sm">
          <option value="rating">Ordenar por: Calificación</option>
          <option value="distance">Ordenar por: Distancia</option>
          <option value="name">Ordenar por: Nombre</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {places.map((place) => (
          <Card key={place.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={place.image || "/placeholder.svg"} alt={place.name} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <Badge variant={place.type === "Bar" ? "default" : "secondary"}>{place.type}</Badge>
              </div>
            </div>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{place.name}</CardTitle>
                <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span className="text-sm font-medium">{place.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{place.location}</span>
                <span className="mx-2">•</span>
                <span>{place.distance}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>{place.openHours}</span>
              </div>
              <p className="text-sm">{place.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {place.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {getFeatureIcon(feature)}
                    <span>{feature}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button asChild variant="outline" size="sm">
                <Link href={`/lugar/${place.id}`}>Ver detalles</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={`/reservar/${place.id}`}>Reservar</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

