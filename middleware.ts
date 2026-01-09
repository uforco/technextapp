import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  console.log("==============>>>", token);

  if (protectedRoutes.includes(req.nextUrl.pathname) && token) {
    return NextResponse.next();
  }
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (authRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
