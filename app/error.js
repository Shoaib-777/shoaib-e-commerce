'use client'
import Link from "next/link";

export default function ErrorPage() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-6">Oops! Page not found.</p>
          <p className="mb-6">The page you are looking for doesn&apos;t exist or has been moved.</p>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }
  