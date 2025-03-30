import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Crear una cuenta</h1>
            <p className="text-muted-foreground mt-2">Regístrate para disfrutar de todas las funcionalidades</p>
          </div>
          <RegisterForm />
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

