import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Phone, Mail, Globe, Instagram, Facebook, Share2 } from "lucide-react"

export function PlaceDetails({ place }) {
  return (
    <div>
      <div className="relative h-[300px] md:h-[400px] w-full">
        <Image src={place.image || "/placeholder.svg"} alt={place.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container">
            <Badge variant={place.type === "Bar" ? "default" : "secondary"} className="mb-2">
              {place.type}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{place.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{place.address}</span>
              </div>
              <div className="flex items-center bg-white/20 px-2 py-1 rounded">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{place.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Acerca de</h2>
            <p className="mb-6">{place.description}</p>

            <h3 className="text-xl font-semibold mb-3">Características</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {place.features.map((feature, index) => (
                <Badge key={index} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-3">Fotos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {place.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`${place.name} - Foto ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Información de contacto</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <a href={`tel:${place.contactInfo.phone}`} className="hover:underline">
                      {place.contactInfo.phone}
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary" />
                    <a href={`mailto:${place.contactInfo.email}`} className="hover:underline">
                      {place.contactInfo.email}
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Globe className="h-5 w-5 mr-3 text-primary" />
                    <a
                      href={`https://${place.contactInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {place.contactInfo.website}
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Instagram className="h-5 w-5 mr-3 text-primary" />
                    <span>{place.contactInfo.socialMedia.instagram}</span>
                  </li>
                  <li className="flex items-center">
                    <Facebook className="h-5 w-5 mr-3 text-primary" />
                    <span>{place.contactInfo.socialMedia.facebook}</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
                  <div className="relative h-[200px] w-full bg-muted rounded-md overflow-hidden mb-4">
                    {/* Aquí iría un mapa real con la API de Google Maps */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{place.address}</p>
                  <Button variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" /> Cómo llegar
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" /> Compartir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

