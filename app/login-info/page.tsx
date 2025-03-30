import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginInfoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Información de Acceso</h1>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceso para Usuarios</CardTitle>
                <CardDescription>Información para acceder como usuario regular</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Para acceder como usuario regular, utiliza las siguientes credenciales:</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p>
                    <strong>Email:</strong> usuario@ejemplo.com
                  </p>
                  <p>
                    <strong>Contraseña:</strong> password123
                  </p>
                </div>
                <p className="mb-4">Como usuario regular, podrás:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Buscar bares y boliches</li>
                  <li>Ver detalles de establecimientos</li>
                  <li>Hacer reservas</li>
                  <li>Dejar reseñas y calificaciones</li>
                  <li>Guardar lugares favoritos</li>
                </ul>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/login">Ir a Iniciar Sesión</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acceso para Dueños de Establecimientos</CardTitle>
                <CardDescription>Información para acceder como dueño de bar o boliche</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Para acceder como dueño de establecimiento, utiliza las siguientes credenciales:</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p>
                    <strong>Email:</strong> bar@ejemplo.com
                  </p>
                  <p>
                    <strong>Contraseña:</strong> password123
                  </p>
                </div>
                <p className="mb-4">Como dueño de establecimiento, podrás:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Gestionar la información de tu establecimiento</li>
                  <li>Ver y gestionar reservas</li>
                  <li>Responder a reseñas</li>
                  <li>Publicar promociones y eventos</li>
                  <li>Ver estadísticas de visitas y reservas</li>
                </ul>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/login">Ir a Iniciar Sesión</Link>
                  </Button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Después de iniciar sesión, serás redirigido al panel de administración en:
                  </p>
                  <code className="text-sm bg-muted p-1 rounded">/admin/dashboard</code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acceso para Administradores del Sistema</CardTitle>
                <CardDescription>Información para acceder como administrador del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Para acceder como administrador del sistema, utiliza las siguientes credenciales:
                </p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p>
                    <strong>Email:</strong> admin@ejemplo.com
                  </p>
                  <p>
                    <strong>Contraseña:</strong> admin123
                  </p>
                </div>
                <p className="mb-4">Como administrador del sistema, podrás:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Gestionar todos los usuarios y establecimientos</li>
                  <li>Aprobar o rechazar nuevos establecimientos</li>
                  <li>Moderar reseñas y contenido</li>
                  <li>Gestionar novedades y publicidad</li>
                  <li>Ver estadísticas globales del sistema</li>
                </ul>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/login">Ir a Iniciar Sesión</Link>
                  </Button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Después de iniciar sesión, serás redirigido al panel de administración del sistema en:
                  </p>
                  <code className="text-sm bg-muted p-1 rounded">/system-admin/dashboard</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

