"use client";

import { SessionProvider } from "next-auth/react";
import React from 'react';
import LogoutButton from "./LogoutButton"; // Keep the LogoutButton within the client context

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
      {/* Display LogoutButton only if session exists - for demonstration */}
      <div className="fixed bottom-4 right-4">
        <LogoutButton />
      </div>
    </SessionProvider>
  );
}
