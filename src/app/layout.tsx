import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import LogoutButton from "@/components/LogoutButton"; // Import the LogoutButton

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSLS - Learning Management System",
  description: "A lite LMS built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
          {/* Display LogoutButton only if session exists - for demonstration */}
          <div className="fixed bottom-4 right-4">
            <LogoutButton />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
