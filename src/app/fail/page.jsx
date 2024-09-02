import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';

function FailedLogin() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center w-11/12 max-w-md">
        <div className="flex flex-col items-center">
          <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
          <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Failed login. Please try again.</h1>
          <Link href={"/signin"}><button
            className="flex items-center justify-center mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <span>Retry</span>
            <FaExclamationCircle className="ml-2" />
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default FailedLogin;
