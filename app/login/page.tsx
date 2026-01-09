import { LoginForm } from "@/components/auth/login-form"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";


export default async function LoginPage() {

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if(token) {
    redirect("/dashboard")
  }

  console.log("login page", token);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <LoginForm />
    </main>
  )
}
