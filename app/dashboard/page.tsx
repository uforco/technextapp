import { Dashboard } from "@/components/dashboard/dashboard";
import { cookies } from "next/headers";

export default async function Home() {
  return <Dashboard />;
}
