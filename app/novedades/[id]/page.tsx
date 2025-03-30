import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays, ArrowLeft, Share2 } from "lucide-react"

// Datos de ejemplo para las novedades
const newsItems = [
  {
    id: 1,
    title: "Festival de Música en vivo",
    date: "15 de Abril, 2024",
    image: "/placeholder.svg?height=500&width=1000",
    excerpt: "No te pierdas el festival de música en vivo con bandas locales e internacionales.",
    content:
      "Este fin de semana, los mejores bares de la ciudad se unen para traerte un festival de música en vivo con bandas locales e internacionales. Habrá promociones especiales, sorteos y mucha diversión. ¡No te lo pierdas!\n\nEl evento comenzará a las 20:00 horas y se extenderá hasta la madrugada. Las entradas ya están a la venta en los establecimientos participantes y también podrás adquirirlas en la puerta el día del evento.\n\nLas bandas confirmadas incluyen:\n- Los Rockeros Locales\n- Banda Internacional\n- DJ Famous\n- Y muchos más...\n\nNo olvides llevar tu identificación para poder ingresar a los establecimientos. ¡Te esperamos!",
  },
  {
    id: 2,
    title: "Noche de Cócteles 2x1",
    date: "20 de Abril, 2024",
    image: "/placeholder.svg?height=500&width=1000",
    excerpt: "Disfruta de una noche especial con cócteles 2x1 en los mejores bares de la ciudad.",
    content:
      "Este sábado, los mejores bartenders de la ciudad se reúnen para ofrecerte una noche de cócteles 2x1. Podrás disfrutar de creaciones exclusivas y aprender sobre la historia y preparación de tus bebidas favoritas.\n\nLa promoción estará disponible desde las 21:00 hasta las 01:00 horas. No es necesario reservar, pero te recomendamos llegar temprano para asegurar tu lugar.\n\nAlgunos de los cócteles que podrás disfrutar incluyen:\n- Mojito Especial\n- Margarita Clásica\n- Daiquiri de Fresa\n- Y muchas más creaciones exclusivas\n\n¡No te pierdas esta oportunidad única de disfrutar de los mejores cócteles a precios especiales!",
  },
  {
    id: 3,
    title: "DJ Internacional en Club Nocturno",
    date: "28 de Abril, 2024",
    image: "/placeholder.svg?height=500&width=1000",
    excerpt: "Un reconocido DJ internacional estará tocando este fin de semana. ¡No te lo pierdas!",
    content:
      "El próximo fin de semana, uno de los DJs más reconocidos a nivel internacional estará tocando en exclusiva en Club Nocturno. Las entradas ya están a la venta y se espera que se agoten rápidamente. ¡Asegura tu lugar!\n\nEl evento comenzará a las 00:00 horas y se extenderá hasta las 06:00 de la mañana. Habrá zonas VIP disponibles con servicio de botellas y una vista privilegiada del escenario.\n\nLas entradas pueden adquirirse en línea o en la boletería del club. Los precios varían según la ubicación y el tipo de entrada que desees.\n\n¡Prepárate para una noche inolvidable con la mejor música electrónica!",
  },
  {
    id: 4,
    title: "Semana Gastronómica en Bares de la Ciudad",
    date: "1-7 de Mayo, 2024",
    image: "/placeholder.svg?height=500&width=1000",
    excerpt: "Una semana dedicada a la gastronomía en los mejores bares de la ciudad.",
    content:
      "Durante la primera semana de mayo, los mejores bares de la ciudad ofrecerán menús especiales y maridajes exclusivos. Una oportunidad única para disfrutar de la mejor gastronomía y bebidas en un ambiente relajado.\n\nCada establecimiento participante ofrecerá un menú degustación a un precio fijo, que incluirá varios platos y bebidas seleccionadas para complementar cada uno.\n\nAlgunos de los establecimientos participantes incluyen:\n- Bar La Esquina\n- Pub Irlandés\n- Café del Arte\n- Cervecería Artesanal\n\nTe recomendamos reservar con anticipación, ya que se espera una gran afluencia de público durante toda la semana.",
  },
  {
    id: 5,
    title: "Fiesta de Disfraces en Boliche Noche",
    date: "5 de Mayo, 2024",
    image: "/placeholder.svg?height=500&width=1000",
    excerpt: "Gran fiesta de disfraces con premios para los mejores trajes.",
    content:
      "Boliche Noche organiza una gran fiesta de disfraces con premios para los mejores trajes. Habrá música en vivo, shows especiales y muchas sorpresas. ¡No te pierdas esta noche única!\n\nLa fiesta comenzará a las 00:00 horas y se extenderá hasta las 06:00 de la mañana. El ingreso con disfraz tendrá un descuento especial en la entrada.\n\nLos premios para los mejores disfraces incluyen:\n- 1er lugar: Botella de champagne y entrada VIP para 4 personas\n- 2do lugar: Botella de destilado a elección\n- 3er lugar: Consumición gratis toda la noche\n\n¡Prepara tu mejor disfraz y ven a divertirte!",
  },
  {
    id: 6,
    title: "Noche de Stand Up Comedy",
    date: "10 de Mayo, 2024",
    image: "/placeholder.svg?height=500&width=1000",
    excerpt: "Los mejores comediantes de la ciudad se presentan en Bar La Esquina.",
    content:
      "Este viernes, Bar La Esquina presenta una noche de Stand Up Comedy con los mejores comediantes de la ciudad. Risas garantizadas y promociones especiales en bebidas durante todo el show.\n\nEl show comenzará a las 21:00 horas y tendrá una duración aproximada de 2 horas. La entrada tiene un costo de $1500 por persona, que incluye una bebida de bienvenida.\n\nLos comediantes confirmados son:\n- Comediante Famoso\n- Humorista Local\n- Nueva Promedia\n- Maestro de Ceremonias\n\nLas entradas son limitadas, por lo que te recomendamos reservar con anticipación para asegurar tu lugar.",
  },
]

export default function NewsDetailPage({ params }) {
  const newsItem = newsItems.find((item) => item.id.toString() === params.id) || newsItems[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/novedades">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a novedades
            </Link>
          </Button>

          <div className="relative h-[300px] w-full mb-6">
            <Image
              src={newsItem.image || "/placeholder.svg"}
              alt={newsItem.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">{newsItem.title}</h1>

          <div className="flex items-center text-muted-foreground mb-6">
            <CalendarDays className="h-4 w-4 mr-1" />
            {newsItem.date}
          </div>

          <div className="prose max-w-none">
            {newsItem.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n")
                return (
                  <ul key={index} className="my-4">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                )
              }
              return <p key={index}>{paragraph}</p>
            })}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/novedades">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ver más novedades
              </Link>
            </Button>

            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Compartir
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

