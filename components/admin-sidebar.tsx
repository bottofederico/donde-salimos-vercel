"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, CalendarDays, MessageSquare, ImageIcon, Settings, Menu, LogOut } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Reservas",
    href: "/admin/reservas",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Reseñas",
    href: "/admin/resenas",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Publicidad",
    href: "/admin/publicidad",
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    title: "Configuración",
    href: "/admin/configuracion",
    icon: <Settings className="h-5 w-5" />,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Sidebar para pantallas medianas y grandes */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Bar La Esquina</h2>
          <p className="text-sm text-muted-foreground">Panel de administración</p>
        </div>
        <ScrollArea className="flex-1 px-3">
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
              <h2 className="text-lg font-semibold">Bar La Esquina</h2>
              <p className="text-sm text-muted-foreground">Panel de administración</p>
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

