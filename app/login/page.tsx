import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
            <p className="text-muted-foreground mt-2">Ingresa a tu cuenta para acceder a todas las funcionalidades</p>
          </div>
          <LoginForm />
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

