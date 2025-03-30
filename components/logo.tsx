import { MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const logoSizeClasses = {
    sm: "h-6 w-auto",
    md: "h-8 w-auto",
    lg: "h-10 w-auto",
  }

  const logoWidths = {
    sm: 100,
    md: 150,
    lg: 200,
  }

  const logoHeights = {
    sm: 30,
    md: 45,
    lg: 60,
  }

  return (
    <Link href="/" className="flex items-center gap-2">
      {!showText && (
        <div className="relative map-pin-pulse">
          <MapPin className={`${sizeClasses[size]} text-primary`} fill="currentColor" strokeWidth={1.5} />
        </div>
      )}
      {showText && (
        <div className={`relative ${logoSizeClasses[size]}`}>
          <Image
            src="/images/logo.png"
            alt="¿Dónde Salimos?"
            width={logoWidths[size]}
            height={logoHeights[size]}
            style={{
              height: "100%",
              width: "auto",
            }}
          />
        </div>
      )}
    </Link>
  )
}

