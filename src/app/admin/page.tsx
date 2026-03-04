// csls/src/app/admin/page.tsx

import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/signin");
  }

  return (
    <div className="min-h-full">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Welcome, {session.user.name || session.user.email}!</h1>
      <p className="text-lg text-gray-700 mb-10">This is your central hub for managing the CSLS platform.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {/* Admin Dashboard Cards/Widgets */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <h3 className="text-2xl font-bold mb-2">Total Users</h3>
          <p className="text-4xl font-extrabold">1,234</p> {/* Placeholder */}
          <p className="text-sm opacity-80 mt-2">Registered users across all roles</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <h3 className="text-2xl font-bold mb-2">Active Classes</h3>
          <p className="text-4xl font-extrabold">42</p> {/* Placeholder */}
          <p className="text-sm opacity-80 mt-2">Currently running courses</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <h3 className="text-2xl font-bold mb-2">Pending Assignments</h3>
          <p className="text-4xl font-extrabold">187</p> {/* Placeholder */}
          <p className="text-sm opacity-80 mt-2">Awaiting grading or review</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Quick Actions</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <li>
            <Link href="/admin/users"
              className="flex items-center space-x-3 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm-6-4a4 4 0 00-4 4v1h8v-1a4 4 0 00-4-4z" />
              </svg>
              <span className="font-medium text-lg">Manage Users</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center space-x-3 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLineLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium text-lg">Create New Class</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center space-x-3 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="font-medium text-lg">View System Logs</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center space-x-3 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.962.583 2.13-.377 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium text-lg">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
