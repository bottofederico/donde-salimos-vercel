import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

// Datos de ejemplo para los lugares destacados
const featuredPlaces = [
  {
    id: 1,
    name: "Bar La Esquina",
    type: "Bar",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    location: "Palermo, Buenos Aires",
    description: "Un bar acogedor con excelente música y ambiente.",
  },
  {
    id: 2,
    name: "Boliche Noche",
    type: "Boliche",
    rating: 4.2,
    image: "/placeholder.svg?height=200&width=300",
    location: "Recoleta, Buenos Aires",
    description: "El mejor lugar para bailar toda la noche.",
  },
  {
    id: 3,
    name: "Pub Irlandés",
    type: "Bar",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    location: "San Telmo, Buenos Aires",
    description: "Auténtica experiencia irlandesa con gran selección de cervezas.",
  },
  {
    id: 4,
    name: "Club Nocturno",
    type: "Boliche",
    rating: 4.0,
    image: "/placeholder.svg?height=200&width=300",
    location: "Puerto Madero, Buenos Aires",
    description: "Música electrónica y ambiente exclusivo.",
  },
]

export function FeaturedPlaces() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Lugares Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={place.image || "/placeholder.svg"} alt={place.name} fill className="object-cover" />
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <Badge variant={place.type === "Bar" ? "default" : "secondary"}>{place.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-2">{place.location}</p>
                <p className="text-sm line-clamp-2">{place.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span className="text-sm font-medium">{place.rating}</span>
                </div>
                <Link href={`/lugar/${place.id}`} className="text-sm font-medium text-primary hover:underline">
                  Ver detalles
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

