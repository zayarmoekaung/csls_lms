// csls/src/app/admin/layout.tsx

import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 shadow-xl flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-extrabold mb-8 border-b border-gray-700 pb-4 text-center tracking-wide">CSLS Admin</h2>
          <nav className="space-y-2">
            <Link href="/admin"
              className="flex items-center space-x-3 py-3 px-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 01-1-1v-4a1 1 001-1h4a1 1 001 1v4a1 1 01-1 1h-6z" />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/users"
              className="flex items-center space-x-3 py-3 px-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm-6-4a4 4 0 00-4 4v1h8v-1a4 4 0 00-4-4z" />
              </svg>
              <span>User Management</span>
            </Link>
            {/* Add more admin navigation links here */}
          </nav>
        </div>
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CSLS Admin
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white overflow-auto rounded-tl-3xl shadow-inner ml-4 my-4">
        {children}
      </main>
    </div>
  );
}
