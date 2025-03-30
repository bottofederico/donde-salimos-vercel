"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Users, Building, MessageSquare, Bell, ImageIcon, Settings, Menu, LogOut } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/system-admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Usuarios",
    href: "/system-admin/usuarios",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Bares y Boliches",
    href: "/system-admin/establecimientos",
    icon: <Building className="h-5 w-5" />,
  },
  {
    title: "Reseñas",
    href: "/system-admin/resenas",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Novedades",
    href: "/system-admin/novedades",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Publicidad",
    href: "/system-admin/publicidad",
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    title: "Configuración",
    href: "/system-admin/configuracion",
    icon: <Settings className="h-5 w-5" />,
  },
]

export function SystemAdminSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Sidebar para pantallas medianas y grandes */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background h-screen">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Dónde Salimos?</h2>
          <p className="text-sm text-muted-foreground">Administración del sistema</p>
        </div>
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/logout">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Link>
          </Button>
        </div>
      </div>

      {/* Sidebar móvil */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Dónde Salimos?</h2>
              <p className="text-sm text-muted-foreground">Administración del sistema</p>
            </div>
            <ScrollArea className="flex-1 px-3 py-4">
              <nav className="flex flex-col gap-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

