import Link from "next/link"
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo showText={true} size="md" />
            </div>
            <p className="text-sm opacity-80">
              Encuentra los mejores bares y boliches cerca de ti. Lee reseñas, haz reservas y organiza tus salidas de
              manera fácil y rápida.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/bares" className="opacity-80 hover:opacity-100 transition-opacity">
                  Bares
                </Link>
              </li>
              <li>
                <Link href="/boliches" className="opacity-80 hover:opacity-100 transition-opacity">
                  Boliches
                </Link>
              </li>
              <li>
                <Link href="/novedades" className="opacity-80 hover:opacity-100 transition-opacity">
                  Novedades
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="opacity-80">Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@dondesalimos.com" className="opacity-80 hover:opacity-100 transition-opacity">
                  info@dondesalimos.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+5491123456789" className="opacity-80 hover:opacity-100 transition-opacity">
                  +54 9 11 2345-6789
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20">
        <div className="container py-6 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Dónde Salimos? Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

