// csls/middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Example: Protect /admin route
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if not admin
    }

    // Example: Protect /teacher route
    if (pathname.startsWith("/teacher") && token?.role !== "teacher") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if not teacher
    }

    // Example: Protect /student route
    if (pathname.startsWith("/student") && token?.role !== "student") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if not student
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*) traditions",
  ],
};
