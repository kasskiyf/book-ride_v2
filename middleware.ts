import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/profile", "/settings", "/drivers/dashboard", "/rides", "/admin"];
const authPaths = ["/auth"];
const driverPaths = ["/drivers/dashboard"];
const adminPaths = ["/admin"];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("jacks_ride_auth");
  const { pathname } = request.nextUrl;

  // Allow access to the main drivers page without authentication
  if (pathname === "/drivers") {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (authPaths.includes(pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to login for protected paths
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !currentUser) {
    const redirectUrl = new URL("/auth", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    if (driverPaths.some(path => pathname.startsWith(path))) {
      redirectUrl.searchParams.set("type", "driver");
    }
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};