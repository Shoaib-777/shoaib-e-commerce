"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CheckoutMain from '../components/CheckoutMain'
import { FaLock } from 'react-icons/fa'
import Link from 'next/link'



const Checkout = ({session}) => {
  if(!session){
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center border border-gray-300">
        <FaLock className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
          Please login before checkout
        </h2>
        <p className="mt-2 text-gray-600">
          You need to login to access the checkout and complete your order.
        </p>
        <Link href="/login">
          <span className="mt-6 inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
            Go to Login
          </span>
        </Link>
      </div>
    </div>
    )
  }
  return (
    <SessionProvider session={session}>
      <CheckoutMain />
    </SessionProvider>
  )
}

export default Checkout