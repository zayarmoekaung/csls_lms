// csls/src/app/signup/page.tsx

import React from 'react';
import Link from 'next/link';

const ChooseSignUpTypePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md text-center transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Join CSLS</h1>
        <p className="text-lg text-gray-700 mb-8">Choose your account type to get started.</p>
        <div className="flex flex-col space-y-4">
          <Link
            href="/signup/student"
            className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Sign Up as Student
          </Link>
          <Link
            href="/signup/teacher"
            className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Sign Up as Teacher
          </Link>
        </div>
        <p className="mt-10 text-base text-gray-700">
          Already have an account?{" "}
          <Link href="/signin" className="font-bold text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ChooseSignUpTypePage;
