import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

// Datos de ejemplo para las novedades
const newsItems = [
  {
    id: 1,
    title: "Festival de Música en vivo",
    date: "15 de Abril, 2024",
    image: "/placeholder.svg?height=200&width=300",
    excerpt: "No te pierdas el festival de música en vivo con bandas locales e internacionales.",
  },
  {
    id: 2,
    title: "Noche de Cócteles 2x1",
    date: "20 de Abril, 2024",
    image: "/placeholder.svg?height=200&width=300",
    excerpt: "Disfruta de una noche especial con cócteles 2x1 en los mejores bares de la ciudad.",
  },
  {
    id: 3,
    title: "DJ Internacional en Club Nocturno",
    date: "28 de Abril, 2024",
    image: "/placeholder.svg?height=200&width=300",
    excerpt: "Un reconocido DJ internacional estará tocando este fin de semana. ¡No te lo pierdas!",
  },
]

export function NewsSection() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Novedades y Eventos</h2>
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
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/novedades">Ver todas las novedades</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

