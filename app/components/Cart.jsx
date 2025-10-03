"use client";
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { BsTrash, BsPlus, BsDash } from 'react-icons/bs'
import { MdShoppingCart } from 'react-icons/md'
import Link from 'next/link';
import { BiSolidNetworkChart } from 'react-icons/bi';

const Cart = ({ setShowCart, setCartItems }) => {
    const cartItems = [{
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    quantity: 2,
    image: "https://placehold.co/150x150?text=Headphones"
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 89.99,
    quantity: 1,
    image: "https://placehold.co/150x150?text=Shoes"
  },
  {
    id: 3,
    name: "Smartwatch",
    category: "Wearables",
    price: 129.99,
    quantity: 1,
    image: "https://placehold.co/150x150?text=Smartwatch"
  }
    ]
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(id)
        } else {
            setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ))
        }
    }

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
    }

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    return (
        <div className='w-full min-h-screen bg-black/50 flex ' >
            {/* Backdrop */}
            <div
                className='flex-1 lg:block bg-black/50'
                onClick={() => setShowCart(false)}
            ></div>

            {/* Cart Sidebar */}
            <div className='w-full max-w-md lg:max-w-lg bg-white  h-screen shadow-2xl flex flex-col'>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <MdShoppingCart className="w-6 h-6 text-gray-700" />
                        <h2 className="text-xl font-bold text-gray-900">
                            Shopping Cart ({getTotalItems()})
                        </h2>
                    </div>
                    <button
                        onClick={() => setShowCart(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <IoCloseSharp className='w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900' />
                    </button>
                </div>

                {/* Cart Items */}
                <div className='flex-1 overflow-y-auto px-6 py-4 '>
                    {cartItems.length > 0 ? (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex space-x-4">
                                        {/* Product Image */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {item.category}
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-lg font-bold text-gray-900">
                                                    ${item.price}
                                                </span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                                >
                                                    <BsTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                                            >
                                                <BsDash className="w-4 h-4" />
                                            </button>
                                            <span className="text-sm font-medium w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                                            >
                                                <BsPlus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700">
                                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart Button */}
                            <button
                                onClick={clearCart}
                                className="w-full mt-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>
                    ) : (
                        /* Empty Cart */
                        <div className="flex flex-col items-center justify-center h-full text-center py-8">
                            <MdShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Your cart is empty
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Add items to your cart to see them here
                            </p>
                            <button
                                onClick={() => setShowCart(false)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer - Checkout Section */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-6 space-y-4">
                        {/* Order Summary */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                                <span className="font-medium">${getTotalPrice()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax</span>
                                <span className="font-medium">
                                    ${(parseFloat(getTotalPrice()) * 0.08).toFixed(2)}
                                </span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${(parseFloat(getTotalPrice()) * 1.08).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Link href={'/checkout'}><button onClick={()=>setShowCart(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                                Proceed to Checkout
                            </button></Link>
                            <Link href={'/'}><button
                                onClick={() => setShowCart(false)}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition-colors"
                            >
                                Continue Shopping
                            </button></Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart