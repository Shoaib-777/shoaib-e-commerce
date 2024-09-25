// app/404.js
'use client'
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
      <h2 className="text-3xl md:text-5xl font-semibold mt-6 text-gray-800">Page Not Found</h2>
      <p className="text-md md:text-xl mt-4 text-gray-600">Sorry The page you are looking for does not exist.</p>
      <Link href="/" className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg">
        Go Home
      </Link>
    </div>
  );
}
