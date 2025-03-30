import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApiIntegrationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Integración con APIs</h1>

          <p className="mb-8">
            Esta página explica cómo implementar correctamente las integraciones con APIs externas en un entorno de
            producción.
          </p>

          <Tabs defaultValue="google-maps">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="google-maps">Google Maps</TabsTrigger>
              <TabsTrigger value="auth">Autenticación</TabsTrigger>
              <TabsTrigger value="database">Base de Datos</TabsTrigger>
            </TabsList>

            <TabsContent value="google-maps" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integración con Google Maps</CardTitle>
                  <CardDescription>Cómo implementar correctamente la API de Google Maps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-semibold">Requisitos previos</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <p>Crear una cuenta en Google Cloud Platform</p>
                      <p className="text-sm text-muted-foreground">
                        Visita{" "}
                        <a href="https://cloud.google.com" className="text-primary hover:underline">
                          cloud.google.com
                        </a>{" "}
                        y crea una cuenta si aún no tienes una.
                      </p>
                    </li>
                    <li>
                      <p>Crear un proyecto en Google Cloud Platform</p>
                      <p className="text-sm text-muted-foreground">
                        En la consola de Google Cloud, crea un nuevo proyecto para tu aplicación.
                      </p>
                    </li>
                    <li>
                      <p>Habilitar las APIs necesarias</p>
                      <p className="text-sm text-muted-foreground">
                        Habilita las siguientes APIs: Maps JavaScript API, Geocoding API, Places API y Directions API.
                      </p>
                    </li>
                    <li>
                      <p>Crear una clave de API</p>
                      <p className="text-sm text-muted-foreground">
                        Genera una clave de API con las restricciones adecuadas (dominio, IP, etc.).
                      </p>
                    </li>
                  </ol>

                  <h3 className="text-lg font-semibold">Implementación</h3>
                  <p>Para implementar Google Maps en tu aplicación, sigue estos pasos:</p>

                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-semibold">1. Configurar variables de entorno</p>
                    <p className="text-sm mb-2">
                      Crea un archivo <code>.env.local</code> en la raíz de tu proyecto:
                    </p>
                    <pre className="bg-black text-white p-2 rounded text-sm overflow-x-auto">
                      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_clave_de_api
                    </pre>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-semibold">2. Crear un servicio para Google Maps</p>
                    <p className="text-sm mb-2">
                      Implementa el archivo <code>lib/google-maps.ts</code> como se mostró anteriormente.
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-semibold">3. Crear componentes de mapa</p>
                    <p className="text-sm mb-2">
                      Implementa el componente <code>GoogleMap</code> como se mostró anteriormente.
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold">Consideraciones importantes</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Siempre restringe tu clave de API para evitar uso no autorizado.</li>
                    <li>Implementa manejo de errores adecuado para cuando la API no esté disponible.</li>
                    <li>Considera el uso de caché para reducir el número de llamadas a la API.</li>
                    <li>Ten en cuenta los límites de uso gratuito y los costos asociados.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="auth" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integración de Autenticación</CardTitle>
                  <CardDescription>Cómo implementar un sistema de autenticación seguro</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-semibold">Opciones recomendadas</h3>
                  <div className="space-y-4">
                    <div className="border p-4 rounded-md">
                      <h4 className="font-semibold">NextAuth.js / Auth.js</h4>
                      <p className="text-sm mb-2">
                        Solución completa de autenticación para Next.js con soporte para múltiples proveedores.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <a href="https://next-auth.js.org" className="text-primary hover:underline">
                          https://next-auth.js.org
                        </a>
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h4 className="font-semibold">Firebase Authentication</h4>
                      <p className="text-sm mb-2">
                        Servicio de autenticación de Google con múltiples métodos de inicio de sesión.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <a href="https://firebase.google.com/products/auth" className="text-primary hover:underline">
                          https://firebase.google.com/products/auth
                        </a>
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h4 className="font-semibold">Supabase Auth</h4>
                      <p className="text-sm mb-2">
                        Alternativa de código abierto a Firebase con autenticación integrada.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <a href="https://supabase.com/auth" className="text-primary hover:underline">
                          https://supabase.com/auth
                        </a>
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold">Implementación con NextAuth.js</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <p>Instalar NextAuth.js</p>
                      <pre className="bg-black text-white p-2 rounded text-sm overflow-x-auto">
                        npm install next-auth
                      </pre>
                    </li>
                    <li>
                      <p>Configurar API route para NextAuth</p>
                      <p className="text-sm text-muted-foreground">
                        Crea el archivo <code>app/api/auth/[...nextauth]/route.ts</code>
                      </p>
                    </li>
                    <li>
                      <p>Configurar proveedores de autenticación</p>
                      <p className="text-sm text-muted-foreground">
                        Configura los proveedores que deseas utilizar (credenciales, Google, Facebook, etc.)
                      </p>
                    </li>
                    <li>
                      <p>Implementar componentes de autenticación</p>
                      <p className="text-sm text-muted-foreground">
                        Crea componentes para inicio de sesión, registro, etc.
                      </p>
                    </li>
                  </ol>

                  <h3 className="text-lg font-semibold">Consideraciones de seguridad</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Utiliza HTTPS en producción.</li>
                    <li>Implementa protección contra CSRF.</li>
                    <li>Almacena contraseñas con hash y salt adecuados.</li>
                    <li>Implementa autenticación de dos factores cuando sea posible.</li>
                    <li>Configura políticas de contraseñas seguras.</li>
                    <li>Implementa límites de intentos de inicio de sesión.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integración con Base de Datos</CardTitle>
                  <CardDescription>Opciones para implementar una base de datos en producción</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-semibold">Opciones recomendadas</h3>
                  <div className="space-y-4">
                    <div className="border p-4 rounded-md">
                      <h4 className="font-semibold">PostgreSQL con Prisma</h4>
                      <p className="text-sm mb-2">Base de datos relacional potente con ORM moderno para TypeScript.</p>
                      <p className="text-sm text-muted-foreground">
                        <a href="https://www.prisma.io" className="text-primary hover:underline">
                          https://www.prisma.io
                        </a>
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h4 className="font-semibold">MongoDB con Mongoose</h4>
                      <p className="text-sm mb-2">Base de datos NoSQL flexible con ODM para Node.js.</p>
                      <p className="text-sm text-muted-foreground">
                        <a href="https://mongoosejs.com" className="text-primary hover:underline">
                          https://mongoosejs.com
                        </a>
                      </p>
                    </div>

                    <div className="border p-4 rounded-md">
                      <h4 className="font-semibold">Supabase</h4>
                      <p className="text-sm mb-2">Alternativa de código abierto a Firebase con PostgreSQL.</p>
                      <p className="text-sm text-muted-foreground">
                        <a href="https://supabase.com" className="text-primary hover:underline">
                          https://supabase.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold">Implementación con Prisma y PostgreSQL</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <p>Instalar Prisma</p>
                      <pre className="bg-black text-white p-2 rounded text-sm overflow-x-auto">
                        npm install prisma @prisma/client npx prisma init
                      </pre>
                    </li>
                    <li>
                      <p>Configurar la conexión a la base de datos</p>
                      <p className="text-sm text-muted-foreground">
                        Edita el archivo <code>.env</code> con tu URL de conexión.
                      </p>
                    </li>
                    <li>
                      <p>Definir el esquema de la base de datos</p>
                      <p className="text-sm text-muted-foreground">
                        Edita el archivo <code>prisma/schema.prisma</code> con tus modelos.
                      </p>
                    </li>
                    <li>
                      <p>Generar el cliente de Prisma</p>
                      <pre className="bg-black text-white p-2 rounded text-sm overflow-x-auto">npx prisma generate</pre>
                    </li>
                    <li>
                      <p>Crear un cliente de Prisma para tu aplicación</p>
                      <p className="text-sm text-muted-foreground">
                        Crea un archivo <code>lib/prisma.ts</code> para exportar una instancia del cliente.
                      </p>
                    </li>
                  </ol>

                  <h3 className="text-lg font-semibold">Consideraciones importantes</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Utiliza variables de entorno para las credenciales de la base de datos.</li>
                    <li>Implementa migraciones para gestionar cambios en el esquema.</li>
                    <li>Configura backups regulares de la base de datos.</li>
                    <li>Implementa índices adecuados para optimizar consultas frecuentes.</li>
                    <li>Considera la escalabilidad según las necesidades de tu aplicación.</li>
                    <li>Implementa manejo de errores adecuado para problemas de conexión.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

