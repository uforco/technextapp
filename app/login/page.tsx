import { LoginForm } from "@/components/auth/login-form"
import { cookies } from "next/headers"


export default async function LoginPage() {

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <LoginForm />
    </main>
  )
}
