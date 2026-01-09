import { Dashboard } from "@/components/dashboard/dashboard";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;


  return <Dashboard token={token} />;
}
