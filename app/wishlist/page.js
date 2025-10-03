"use client";
import React, { useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsCart3, BsTrash } from 'react-icons/bs'
import { IoHeartCircleOutline } from 'react-icons/io5';
import { MdShoppingCart } from 'react-icons/md'
import AddToCartBtn from '../components/AddToCartBtn';

const WishlistPage = () => {
    const [showCart, setShowCart] = useState(false)
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: 'DANVOUY Womens T Shirt Casual Cotton Short',
            price: 79.99,
            image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png',
            category: 'Electronics',
            rating: 4.5
        },
        {
            id: 2,
            name: 'Premium Coffee Maker',
            price: 129.99,
            image: 'https://via.placeholder.com/300x300/DC2626/white?text=Coffee+Maker',
            category: 'Appliances',
            rating: 4.8
        },
        {
            id: 3,
            name: 'Organic Cotton T-Shirt',
            price: 29.99,
            image: 'https://via.placeholder.com/300x300/059669/white?text=T-Shirt',
            category: 'Clothing',
            rating: 4.2
        },
        {
            id: 4,
            name: 'Fitness Tracker Watch',
            price: 199.99,
            image: 'https://via.placeholder.com/300x300/7C3AED/white?text=Watch',
            category: 'Fitness',
            rating: 4.6
        },
        {
            id: 5,
            name: 'Portable Power Bank',
            price: 49.99,
            image: 'https://via.placeholder.com/300x300/EA580C/white?text=Power+Bank',
            category: 'Electronics',
            rating: 4.4
        },
        {
            id: 6,
            name: 'Yoga Exercise Mat',
            price: 39.99,
            image: 'https://via.placeholder.com/300x300/10B981/white?text=Yoga+Mat',
            category: 'Fitness',
            rating: 4.3
        }
    ])

    const [cartItems, setCartItems] = useState([])

    const removeFromWishlist = (id) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id))
    }

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id)
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ))
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
    }

    const moveAllToCart = () => {
        wishlistItems.forEach(item => {
            const existingItem = cartItems.find(cartItem => cartItem.id === item.id)
            if (!existingItem) {
                setCartItems(prev => [...prev, { ...item, quantity: 1 }])
            }
        })
        setWishlistItems([])
    }

    return (
        <div className=" bg-gray-50 relative">

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {wishlistItems.length > 0 ? (
                    <>
                        {/* Action Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
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
                            {wishlistItems.map((item) => (
                                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col border border-gray-100 hover:border-gray-300 pt-2">
                                    {/* Product Image */}
                                    <div className="relative px-2">
                                        <img
                                            src={item.image}
                                            alt={item.name}
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
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center mb-3">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(item.rating)
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
                                            <span className="ml-2 text-sm text-gray-600">{item.rating}</span>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-2xl font-bold text-red-600">
                                                ${item.price}
                                            </span>
                                            <span className="text-2xl font-bold text-gray-500 line-through">
                                                ${item.price*2}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {/* <div className="p-4 pt-0 flex space-x-1">
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="flex-1 bg-black hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                        >
                                            <BsCart3 className="size-6" />
                                            <span>Add to Cart</span>
                                        </button>
                                        <button
                                            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                            onClick={() => removeFromWishlist(item.id)}
                                        >
                                            <IoHeartCircleOutline className="size-12 fill-pink-600" />
                                        </button>
                                    </div> */}
                                    <AddToCartBtn/>
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
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            Start Shopping
                        </button>
                    </div>
                )}
            </main>

        </div>
    )
}

export default WishlistPage