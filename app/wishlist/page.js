"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import WishlistComp from '../components/WishlistComp'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'


const Wishlist = ({ session }) => {
  if(!session){
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 text-center border border-gray-300">
        <FaHeart className="mx-auto h-14 w-14 text-pink-500" />
        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
          Your Wishlist is empty
        </h2>
        <p className="mt-2 text-gray-600">
          You need to login to save your favorite products.
        </p>
        <Link href="/login">
          <span className="mt-6 inline-block w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
            Go to Login
          </span>
        </Link>
      </div>
    </div>
    )
  }
  return (
    <SessionProvider session={session}>
      <WishlistComp session={session} />
    </SessionProvider>
  )
}

export default Wishlist