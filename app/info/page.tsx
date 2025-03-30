import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InfoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Información del Sistema</h1>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Sistema de Autenticación Funcional</CardTitle>
                <CardDescription>Información sobre cómo usar el sistema de autenticación</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Para probar el sistema de autenticación, puedes usar las siguientes credenciales:
                </p>

                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Usuario Regular</h3>
                    <p>
                      <strong>Email:</strong> usuario@ejemplo.com
                    </p>
                    <p>
                      <strong>Contraseña:</strong> password123
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Acceso a funciones básicas como reservas y reseñas.
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Dueño de Bar/Boliche</h3>
                    <p>
                      <strong>Email:</strong> bar@ejemplo.com
                    </p>
                    <p>
                      <strong>Contraseña:</strong> password123
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Acceso al panel de administración de establecimientos.
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Administrador del Sistema</h3>
                    <p>
                      <strong>Email:</strong> admin@ejemplo.com
                    </p>
                    <p>
                      <strong>Contraseña:</strong> admin123
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Acceso completo a todas las funciones del sistema.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button asChild>
                    <Link href="/login">Ir a Iniciar Sesión</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gestión de Reservas</CardTitle>
                <CardDescription>Cómo acceder y usar el sistema de reservas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Para acceder al panel de gestión de reservas:</p>

                <ol className="list-decimal pl-5 space-y-2 mb-4">
                  <li>Inicia sesión con las credenciales de dueño de bar/boliche (bar@ejemplo.com / password123)</li>
                  <li>Serás redirigido automáticamente al panel de administración</li>
                  <li>Haz clic en "Reservas" en el menú lateral</li>
                </ol>

                <p className="mb-4">En el panel de reservas podrás:</p>

                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Ver todas las reservas de tus establecimientos</li>
                  <li>Filtrar reservas por fecha, estado o búsqueda</li>
                  <li>Confirmar o cancelar reservas</li>
                  <li>Ver detalles completos de cada reserva</li>
                </ul>

                <div className="mt-6">
                  <Button asChild>
                    <Link href="/admin/reservas">Ir al Panel de Reservas</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notas sobre la Implementación</CardTitle>
                <CardDescription>Detalles técnicos sobre esta implementación</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Esta implementación utiliza:</p>

                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Una "base de datos" simulada en memoria para almacenar usuarios, reservas, etc.</li>
                  <li>Un sistema de autenticación simulado que persiste entre recargas usando localStorage</li>
                  <li>Componentes React para la interfaz de usuario</li>
                  <li>Context API para gestionar el estado de autenticación</li>
                </ul>

                <p className="text-sm text-muted-foreground">
                  Nota: En una implementación real, se utilizaría una base de datos real (PostgreSQL, MongoDB, etc.) y
                  un sistema de autenticación seguro con tokens JWT o similar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

