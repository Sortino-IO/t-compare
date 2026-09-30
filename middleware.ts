import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Lets the root layout inject homepage-only share tags at the top of `<head>`. */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|og/|.*\\.(?:png|jpg|jpeg|gif|webp|ico|svg|txt|xml|webmanifest)$).*)"],
};
