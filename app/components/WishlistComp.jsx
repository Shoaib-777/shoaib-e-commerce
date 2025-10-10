"use client";
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCart3 } from 'react-icons/bs'
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import AddToCartWrapper from './AddToCartWrapper';
import { FaHeart } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

const WishlistComp = () => {
    const { data: session } = useSession()
    const userId = session?.user?.id
    const { addToCart } = useCartStore()
    const { isLoading, wishlistData } = useWishlistStore()

    const moveAllToCart = () => {
        const productsId = wishlistData.map((item) => item._id)
        addToCart(userId, "multiple_add", null, productsId)
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                <div className="loading loading-spinner loading-lg text-primary"></div>
                <p className="text-lg font-medium text-gray-700">Loading, please wait...</p>
            </div>
        )
    }

    if (!userId) {
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
        <div className=" bg-gray-50 relative">

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {wishlistData.length > 0 ? (
                    <>
                        {/* Action Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {wishlistData.length} item{wishlistData.length !== 1 ? 's' : ''} in your wishlist
                            </h2>
                            <button
                                onClick={moveAllToCart}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                                <BsCart3 className="w-4 h-4" />
                                <span>Move All to Cart</span>
                            </button>
                        </div>

                        {/* Wishlist Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {wishlistData.map((item) => (
                                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col border border-gray-100 hover:border-gray-300 pt-2">
                                    {/* Product Image */}
                                    <div className="relative px-2">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-48 object-contain border border-gray-300 rounded-t-lg"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="mb-2">
                                            <span className="inline-block bg-gray-200 text-red-600 text-xs px-2 py-1 rounded-full font-semibold capitalize">
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center mb-3">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(item.rating.rate)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300'
                                                            }`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="ml-2 text-sm text-gray-600">{item.rating.rate}</span>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-2xl font-bold text-red-600">
                                                ${item.price}
                                            </span>
                                            <span className="text-2xl font-bold text-gray-500 line-through">
                                                ${item.price * 2}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <AddToCartWrapper
                                        productId={item._id.toString()} session={session}
                                    />
                                </div>

                            ))}
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <AiOutlineHeart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                            Your wishlist is empty
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Save items you love for later. Start building your wishlist by browsing our products.
                        </p>

                        <Link href={'/'}><button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            Start Shopping
                        </button></Link>

                    </div>
                )}
            </main>

        </div>
    )
}

export default WishlistComp