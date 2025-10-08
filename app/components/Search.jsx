"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState, useCallback, useEffect } from 'react'
import { BiUser } from 'react-icons/bi'
import { BsCart } from 'react-icons/bs'
import { FaRegHeart, FaSearch } from 'react-icons/fa'
import Cart from './Cart'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useProductStore } from '@/store/useProductsStore'
import { getUserIDCSR } from '@/utils/GetCSrUserId'

const Search = () => {
    const userId = getUserIDCSR()
    const router = useRouter()
    const { getAllProductData, ProductsData } = useProductStore()
    const { isLoading, cartData, getCartData,showCart , setShowCartTrue } = useCartStore()
    const { isLoading: wLoading, wishlistData, getWishList } = useWishlistStore()
    const pathName = usePathname()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const hiddenPaths = ["/signup", "/login", "/about", "/contact"]

    const hideSearchBar = hiddenPaths.includes(pathName)

    // ✅ Instant filter logic (no debounce, no artificial delay)
    const filter = useCallback((search) => {
        try {
            setLoading(true)
            const q = ProductsData?.filter((item) =>
                item.title.toLowerCase().includes(search.trim().toLowerCase()))
            setResults(q)
        } catch (error) {
            console.log("error fetching products based on category", error)
        } finally {
            setLoading(false)
        }

    }, [ProductsData])

    const handleChange = (e) => {
        const value = e.target.value
        setQuery(value)
        if(query.length>2){
            filter(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        filter(query)
    }

    const handleClick = (id)=>{
        setQuery("")
        setResults([])
        router.push(`/products/${id}`)
    }

    useEffect(() => {
        getAllProductData()
        getCartData(userId)
        getWishList(userId)
    }, [userId])


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
                            <div className="absolute bg-red-500 rounded-full top-0 right-0 size-3 text-[10px] grid place-items-center translate-x-1 -translate-y-1">
                                <span className='font-bold'></span>
                            </div>
                        </div>

                        {/* Wishlist */}
                        <div className='relative flex items-center gap-4 border border-gray-300 px-2 py-2 rounded-md'>
                            <Link href={'/wishlist'}>
                                <FaRegHeart fill={pathName === '/wishlist' ? '#ff8f9c' : 'black'} className='w-8 h-8 cursor-pointer' />
                            </Link>
                            <div className={`${wishlistData.length > 0 ? "absolute  " : "hidden"}  bg-red-500 rounded-full top-0 right-1 size-4 text-[10px] grid place-items-center translate-x-1 -translate-y-1`}>
                                <span className='font-bold'>{wishlistData.length}</span>
                            </div>
                        </div>

                        {/* Cart */}
                        <div onClick={setShowCartTrue} className='relative flex items-center gap-4 border border-gray-300 px-2 py-2 rounded-md'>
                            <BsCart fill='black' className='w-8 h-8 cursor-pointer' />
                            <div className={`${cartData.length > 0 ? "absolute" : "hidden"}  bg-red-500 rounded-full top-0 right-1 size-4 text-[10px] grid place-items-center translate-x-1 -translate-y-1`}>
                                <span className='font-bold'>{cartData.length}</span>
                            </div>
                        </div>

                        {/* Cart Modal */}
                        <div className={`${showCart ? "absolute bg-transparent " : "hidden"} absolute w-full bg-gray-50 z-20 right-0 top-0`}>
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>

            {loading && (
                <div className='text-gray-500 absolute w-full text-center'>Loading ...</div>
            )}



            {/* Search Results */}
            {query.length>2 && results.length > 0 && (
                <div className='w-full  bg-white border border-gray-300 shadow-2xl z-10 absolute left-0 px-2 py-1 max-h-[400px] overflow-y-auto'>
                    <ul>
                        {results.map((item) => (
                            <li key={item._id} onClick={()=>handleClick(item._id)} className='w-full h-10 border border-gray-300 px-[2px] flex gap-x-1 items-center overflow-hidden mb-1'>
                                <img src={item.image} alt={item.title} className='border border-gray-400 object-contain size-10 py-1' />
                                <h1 className='line-clamp-1 font-black'>{item.title}</h1>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* No Results */}
            {query.length>2 && results.length === 0 && (
                <div className="px-2 py-1 text-red-500 border border-gray-300 absolute left-0  w-full  shadow-md text-center line-clamp-1 font-medium z-10 bg-white">
                    No results found for "{query}"
                </div>
            )}
        </>
    )
}

export default Search
