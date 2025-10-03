"use client";
import React, { useState } from "react";
// dummyProducts.js
 const dummyProducts = [
  {
    _id: "1",
    name: "Nike Air Max",
    description: "Comfortable running shoes.",
    price: 120,
    category: "Shoes",
    stock: 15,
    images: [{ url: "https://placehold.co/300x200?text=Nike+Air+Max", alt: "Nike Air Max" }],
  },
  {
    _id: "2",
    name: "Apple Watch",
    description: "Smartwatch with health tracking.",
    price: 299,
    category: "Electronics",
    stock: 8,
    images: [{ url: "https://placehold.co/300x200?text=Apple+Watch", alt: "Apple Watch" }],
  },
  {
    _id: "3",
    name: "Backpack",
    description: "Durable and stylish.",
    price: 49,
    category: "Accessories",
    stock: 25,
    images: [{ url: "https://placehold.co/300x200?text=Backpack", alt: "Backpack" }],
  },
  {
    _id: "4",
    name: "Sunglasses",
    description: "UV protection stylish sunglasses.",
    price: 79,
    category: "Accessories",
    stock: 30,
    images: [{ url: "https://placehold.co/300x200?text=Sunglasses", alt: "Sunglasses" }],
  },
  {
    _id: "5",
    name: "Headphones",
    description: "Noise-cancelling over-ear headphones.",
    price: 199,
    category: "Electronics",
    stock: 12,
    images: [{ url: "https://placehold.co/300x200?text=Headphones", alt: "Headphones" }],
  },
];


export default function WishlistDemo() {
  const [wishlist, setWishlist] = useState([]);

  // Toggle wishlist (add/remove product)
  const toggleWishlist = (product) => {
    if (wishlist.find((item) => item._id === product._id)) {
      setWishlist(wishlist.filter((item) => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛍️ Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.images[0].url}
              alt={product.images[0].alt}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2 font-bold">${product.price}</p>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`mt-4 w-full py-2 px-4 rounded-lg font-medium 
                ${
                  wishlist.find((item) => item._id === product._id)
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }
              `}
            >
              {wishlist.find((item) => item._id === product._id)
                ? "❤️ Remove from Wishlist"
                : "🤍 Add to Wishlist"}
            </button>
          </div>
        ))}
      </div>

      {/* Wishlist Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">💖 Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="text-gray-500">No items in wishlist yet.</p>
        ) : (
          <ul className="space-y-3">
            {wishlist.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
              >
                <span className="font-medium">{item.name}</span>
                <button
                  onClick={() => toggleWishlist(item)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
