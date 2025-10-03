"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useCallback } from 'react'
import { BiUser } from 'react-icons/bi'
import { BsCart } from 'react-icons/bs'
import { FaRegHeart, FaSearch } from 'react-icons/fa'
import Cart from './Cart'

const Search = () => {
    const [showCart, setShowCart] = useState(false)
    const pathName = usePathname()
    const [data] = useState([
        { id: 1, img: "https://placehold.co/36x36?text=app", title: "Wireless Bluetooth Earbuds" },
        { id: 2, img: "https://placehold.co/36x36?text=app", title: "Smart Fitness Watch" },
        { id: 3, img: "https://placehold.co/36x36?text=app", title: "Portable Power Bank" },
        { id: 4, img: "https://placehold.co/36x36?text=app", title: "Noise Cancelling Headphones" },
        { id: 5, img: "https://placehold.co/36x36?text=app", title: "USB-C Charging Cable" },
        { id: 6, img: "https://placehold.co/36x36?text=app", title: "Ergonomic Wireless Mouse" },
        { id: 7, img: "https://placehold.co/36x36?text=app", title: "Mechanical Gaming Keyboard" },
        { id: 8, img: "https://placehold.co/36x36?text=app", title: "HD Webcam with Microphone" },
    ])
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const hiddenPaths = ["/signup","/login","/about","/contact"]

    const hideSearchBar = hiddenPaths.includes(pathName)

    // ✅ Instant filter logic (no debounce, no artificial delay)
    const filter = useCallback((search) => {
        try {
            setLoading(true)
            const q = data.filter((item) =>
                item.title.toLowerCase().includes(search.trim().toLowerCase()))
                setResults(q)
        } catch (error) {
            console.log("error fetching products based on category", error)
        } finally {
            setLoading(false)
        }
        
}, [data])

const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    filter(value)
}

const handleSubmit = (e) => {
    e.preventDefault()
    filter(query)
}

return (
    <>
        <div className={`w-full z-10 ${hideSearchBar && "hidden"} `}>
            <div className='flex justify-between items-center relative border border-gray-300 shadow-md px-1 sm:px-2 py-1'>
                <div className='border border-gray-300 shadow-md rounded-3xl flex justify-between items-center flex-1 p-2'>
                    <form onSubmit={handleSubmit} className='flex flex-1 items-center'>
                        <input
                            type="search"
                            placeholder='Search Products...'
                            value={query}
                            onChange={handleChange}
                            className='w-full px-2 outline-none'
                        />
                        <button type="submit">
                            <FaSearch fill='gray' className='size-7' />
                        </button>
                    </form>
                </div>

                {/* Icons Section */}
                <div className='flex justify-evenly items-center gap-x-1 sm:gap-x-2 md:gap-x-3 lg:gap-x-4 px-[2px] sm:px-2'>
                    {/* Profile */}
                    <div className="relative flex items-center gap-4 border border-gray-300 px-2 py-2 rounded-md">
                        <Link href="/profile">
                            <BiUser
                                fill={pathName === "/profile" ? "#ff8f9c" : "black"}
                                className="w-8 h-8 cursor-pointer"
                            />
                        </Link>
                        <div className="absolute bg-red-500 rounded-full top-0 right-1 size-4 text-[10px] grid place-items-center translate-x-1 -translate-y-1">
                            <span className='font-bold'>1</span>
                        </div>
                    </div>

                    {/* Wishlist */}
                    <div className='relative flex items-center gap-4 border border-gray-300 px-2 py-2 rounded-md'>
                        <Link href={'/wishlist'}>
                            <FaRegHeart fill={pathName === '/wishlist' ? '#ff8f9c' : 'black'} className='w-8 h-8 cursor-pointer' />
                        </Link>
                        <div className="absolute bg-red-500 rounded-full top-0 right-1 size-4 text-[10px] grid place-items-center translate-x-1 -translate-y-1">
                            <span className='font-bold'>1</span>
                        </div>
                    </div>

                    {/* Cart */}
                    <div onClick={() => setShowCart(true)} className='relative flex items-center gap-4 border border-gray-300 px-2 py-2 rounded-md'>
                        <BsCart fill='black' className='w-8 h-8 cursor-pointer' />
                        <div className="absolute bg-red-500 rounded-full top-0 right-1 size-4 text-[10px] grid place-items-center translate-x-1 -translate-y-1">
                            <span className='font-bold'>1</span>
                        </div>
                    </div>

                    {/* Cart Modal */}
                    <div className={`${showCart ? "absolute bg-transparent " : "hidden"} absolute w-full bg-gray-50 z-20 right-0 top-0`}>
                        <Cart setShowCart={setShowCart} />
                    </div>
                </div>
            </div>
        </div>

        {loading && (
            <div className='text-gray-500  absolute w-full text-center'>Loading ...</div>
        )}

        

        {/* Search Results */}
        {query && results.length > 0 && (
            <div className='w-full  bg-white border border-gray-300 shadow-2xl z-10 absolute left-0 px-2 py-1'>
                <ul>
                    {results.map((item) => (
                        <li key={item.id} className='w-full h-10 border border-gray-300 px-[2px] flex gap-x-1 items-center overflow-hidden mb-1'>
                            <img src={item.img} alt={item.title} className='border border-black object-contain' />
                            <h1 className='line-clamp-1 font-black'>{item.title}</h1>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* No Results */}
        {query && results.length === 0 && (
            <div className="px-2 py-1 text-red-500 border border-gray-300 absolute left-0  w-full  shadow-md text-center line-clamp-1 font-medium">
                No results found for "{query}"
            </div>
        )}
    </>
)
}

export default Search
