// csls/middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Protect /admin route: Only 'admin' role allowed
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if not admin
    }

    // Protect /teacher route: Only 'teacher' role allowed (or admin)
    if (pathname.startsWith("/teacher") && (token?.role !== "teacher" && token?.role !== "admin")) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if not teacher or admin
    }

    // Protect /student route: Only 'student' role allowed (or admin/teacher)
    if (pathname.startsWith("/student") && (token?.role !== "student" && token?.role !== "teacher" && token?.role !== "admin")) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if not student, teacher, or admin
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
