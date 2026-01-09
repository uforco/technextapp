import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (token) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
