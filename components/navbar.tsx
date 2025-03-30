"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, User, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Logo } from "@/components/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Evitar errores de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="mt-6 mb-8">
                <Logo size="lg" />
              </div>
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-semibold">
                  Inicio
                </Link>
                <Link href="/bares" className="text-lg font-semibold">
                  Bares
                </Link>
                <Link href="/boliches" className="text-lg font-semibold">
                  Boliches
                </Link>
                <Link href="/novedades" className="text-lg font-semibold">
                  Novedades
                </Link>
                {mounted && !isAuthenticated ? (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button asChild>
                      <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/register">Registrarse</Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    {user?.role === "business" && (
                      <Button asChild variant="outline" className="mt-4">
                        <Link href="/admin/dashboard">Panel de Administración</Link>
                      </Button>
                    )}
                    {user?.role === "admin" && (
                      <Button asChild variant="outline" className="mt-4">
                        <Link href="/system-admin/dashboard">Panel de Sistema</Link>
                      </Button>
                    )}
                    <Button asChild variant="outline" className="mt-4">
                      <Link href="/perfil">Mi Perfil</Link>
                    </Button>
                    <Button variant="ghost" className="justify-start mt-2" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Logo showText={true} />
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/bares" className="font-medium transition-colors hover:text-primary">
              Bares
            </Link>
            <Link href="/boliches" className="font-medium transition-colors hover:text-primary">
              Boliches
            </Link>
            <Link href="/novedades" className="font-medium transition-colors hover:text-primary">
              Novedades
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative w-60">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar lugares..." className="w-full pl-8" />
          </div>
          {mounted && !isAuthenticated ? (
            <div className="hidden md:flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Registrarse</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Perfil</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/perfil">Mi Perfil</Link>
                </DropdownMenuItem>
                {user?.role === "business" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard">Panel de Administración</Link>
                  </DropdownMenuItem>
                )}
                {user?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/system-admin/dashboard">Panel de Sistema</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

