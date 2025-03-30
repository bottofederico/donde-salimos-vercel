import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PlaceDetails } from "@/components/place-details"
import { PlaceReviews } from "@/components/place-reviews"
import { PlaceReservation } from "@/components/place-reservation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Esta función simularía la obtención de datos del lugar desde una API o base de datos
function getPlaceData(id) {
  // Datos de ejemplo combinados de bares y boliches
  const allPlaces = [
    {
      id: 1,
      name: "Bar La Esquina",
      type: "Bar",
      rating: 4.5,
      image: "/placeholder.svg?height=400&width=800",
      location: "Palermo, Buenos Aires",
      address: "Av. Santa Fe 1234, CABA",
      coordinates: { lat: -34.5956, lng: -58.4233 },
      distance: "1.2 km",
      description:
        "Un bar acogedor con excelente música y ambiente. Disfruta de nuestras noches de música en vivo y una amplia selección de bebidas y tapas.",
      features: ["Música en vivo", "Comida", "Espacio al aire libre"],
      openHours: {
        monday: "18:00 - 02:00",
        tuesday: "18:00 - 02:00",
        wednesday: "18:00 - 02:00",
        thursday: "18:00 - 03:00",
        friday: "18:00 - 04:00",
        saturday: "18:00 - 04:00",
        sunday: "18:00 - 00:00",
      },
      menu: [
        {
          category: "Bebidas",
          items: [
            { name: "Cerveza artesanal", price: 800 },
            { name: "Gin Tonic", price: 1200 },
            { name: "Vino copa", price: 900 },
          ],
        },
        {
          category: "Comidas",
          items: [
            { name: "Tabla de quesos", price: 2500 },
            { name: "Hamburguesa completa", price: 2800 },
            { name: "Nachos con guacamole", price: 2000 },
          ],
        },
      ],
      photos: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      contactInfo: {
        phone: "+54 11 1234-5678",
        email: "info@barlaesquina.com",
        website: "www.barlaesquina.com",
        socialMedia: {
          instagram: "@barlaesquina",
          facebook: "Bar La Esquina",
        },
      },
    },
    {
      id: 2,
      name: "Boliche Noche",
      type: "Boliche",
      rating: 4.2,
      image: "/placeholder.svg?height=400&width=800",
      location: "Recoleta, Buenos Aires",
      address: "Av. Callao 567, CABA",
      coordinates: { lat: -34.5887, lng: -58.3974 },
      distance: "4.1 km",
      description:
        "El mejor lugar para bailar toda la noche. Contamos con varios ambientes musicales, barras premium y zona VIP.",
      features: ["DJ internacional", "Varios ambientes", "VIP"],
      openHours: {
        monday: "Cerrado",
        tuesday: "Cerrado",
        wednesday: "Cerrado",
        thursday: "00:00 - 05:30",
        friday: "00:00 - 06:00",
        saturday: "00:00 - 06:00",
        sunday: "00:00 - 05:00",
      },
      menu: [
        {
          category: "Bebidas",
          items: [
            { name: "Cerveza", price: 900 },
            { name: "Fernet con Cola", price: 1300 },
            { name: "Vodka con energizante", price: 1500 },
          ],
        },
        {
          category: "Botellas",
          items: [
            { name: "Whisky", price: 15000 },
            { name: "Vodka", price: 12000 },
            { name: "Champagne", price: 18000 },
          ],
        },
      ],
      photos: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      contactInfo: {
        phone: "+54 11 9876-5432",
        email: "info@bolichesnoche.com",
        website: "www.bolichesnoche.com",
        socialMedia: {
          instagram: "@bolichesnoche",
          facebook: "Boliche Noche",
        },
      },
    },
  ]

  return allPlaces.find((place) => place.id.toString() === id.toString()) || null
}

export default function PlacePage({ params }) {
  const place = getPlaceData(params.id)

  if (!place) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Lugar no encontrado</h1>
            <p className="mt-2">El lugar que estás buscando no existe o ha sido eliminado.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PlaceDetails place={place} />

        <div className="container py-8">
          <Tabs defaultValue="info">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              <TabsTrigger value="reservation">Reservar</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Horarios</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Lunes</span>
                      <span>{place.openHours.monday}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Martes</span>
                      <span>{place.openHours.tuesday}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Miércoles</span>
                      <span>{place.openHours.wednesday}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Jueves</span>
                      <span>{place.openHours.thursday}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Viernes</span>
                      <span>{place.openHours.friday}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sábado</span>
                      <span>{place.openHours.saturday}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Domingo</span>
                      <span>{place.openHours.sunday}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Menú</h3>
                  <div className="space-y-4">
                    {place.menu.map((category, index) => (
                      <div key={index}>
                        <h4 className="font-medium mb-2">{category.category}</h4>
                        <ul className="space-y-1">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex justify-between">
                              <span>{item.name}</span>
                              <span className="font-medium">${item.price}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <PlaceReviews placeId={place.id} />
            </TabsContent>
            <TabsContent value="reservation" className="mt-6">
              <PlaceReservation place={place} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

