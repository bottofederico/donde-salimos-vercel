import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays } from "lucide-react"

// Datos de ejemplo para las novedades
const newsItems = [
  {
    id: 1,
    title: "Festival de Música en vivo",
    date: "15 de Abril, 2024",
    image: "/placeholder.svg?height=300&width=600",
    excerpt: "No te pierdas el festival de música en vivo con bandas locales e internacionales.",
    content:
      "Este fin de semana, los mejores bares de la ciudad se unen para traerte un festival de música en vivo con bandas locales e internacionales. Habrá promociones especiales, sorteos y mucha diversión. ¡No te lo pierdas!",
  },
  {
    id: 2,
    title: "Noche de Cócteles 2x1",
    date: "20 de Abril, 2024",
    image: "/placeholder.svg?height=300&width=600",
    excerpt: "Disfruta de una noche especial con cócteles 2x1 en los mejores bares de la ciudad.",
    content:
      "Este sábado, los mejores bartenders de la ciudad se reúnen para ofrecerte una noche de cócteles 2x1. Podrás disfrutar de creaciones exclusivas y aprender sobre la historia y preparación de tus bebidas favoritas.",
  },
  {
    id: 3,
    title: "DJ Internacional en Club Nocturno",
    date: "28 de Abril, 2024",
    image: "/placeholder.svg?height=300&width=600",
    excerpt: "Un reconocido DJ internacional estará tocando este fin de semana. ¡No te lo pierdas!",
    content:
      "El próximo fin de semana, uno de los DJs más reconocidos a nivel internacional estará tocando en exclusiva en Club Nocturno. Las entradas ya están a la venta y se espera que se agoten rápidamente. ¡Asegura tu lugar!",
  },
  {
    id: 4,
    title: "Semana Gastronómica en Bares de la Ciudad",
    date: "1-7 de Mayo, 2024",
    image: "/placeholder.svg?height=300&width=600",
    excerpt: "Una semana dedicada a la gastronomía en los mejores bares de la ciudad.",
    content:
      "Durante la primera semana de mayo, los mejores bares de la ciudad ofrecerán menús especiales y maridajes exclusivos. Una oportunidad única para disfrutar de la mejor gastronomía y bebidas en un ambiente relajado.",
  },
  {
    id: 5,
    title: "Fiesta de Disfraces en Boliche Noche",
    date: "5 de Mayo, 2024",
    image: "/placeholder.svg?height=300&width=600",
    excerpt: "Gran fiesta de disfraces con premios para los mejores trajes.",
    content:
      "Boliche Noche organiza una gran fiesta de disfraces con premios para los mejores trajes. Habrá música en vivo, shows especiales y muchas sorpresas. ¡No te pierdas esta noche única!",
  },
  {
    id: 6,
    title: "Noche de Stand Up Comedy",
    date: "10 de Mayo, 2024",
    image: "/placeholder.svg?height=300&width=600",
    excerpt: "Los mejores comediantes de la ciudad se presentan en Bar La Esquina.",
    content:
      "Este viernes, Bar La Esquina presenta una noche de Stand Up Comedy con los mejores comediantes de la ciudad. Risas garantizadas y promociones especiales en bebidas durante todo el show.",
  },
]

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6">Novedades y Eventos</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    {item.date}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm">{item.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/novedades/${item.id}`}>Leer más</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

