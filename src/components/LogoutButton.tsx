// csls/src/components/LogoutButton.tsx

"use client";

import { signOut } from "next-auth/react";
import React from 'react';

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/signin" })}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
