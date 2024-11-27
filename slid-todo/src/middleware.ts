import { NextRequest, NextResponse } from "next/server";

const protectedPath = ["/dashboard", "/todos", "/goals", "/note"];
const authOnlyPath = ["/login", "/signup"];
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken");
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  console.info(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  const isProtectedPath = protectedPath.some((path) => pathname.startsWith(path));
  const isAuthOnlyPath = authOnlyPath.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !accessToken) {
    console.error(`[Middleware] 접근 거부: ${pathname}`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthOnlyPath && accessToken) {
    console.error(`[Middleware] 리다이렉트: ${pathname} -> /dashboard`);
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/todos/:path*",
    "/goals/:path*",
    "/note/:path*",
    "/login",
    "/signup",
    "/",
  ],
};
