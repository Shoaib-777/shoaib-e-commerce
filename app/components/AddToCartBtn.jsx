"use client"
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { redirectFromSSR } from '@/utils/ServerActions'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { BsCart3 } from 'react-icons/bs'
import { IoHeartCircleOutline } from 'react-icons/io5'

const AddToCartBtn = ({ productId }) => {
    const { data: session } = useSession()
    const userId = session?.user?.id
    const { addToCart, cartData, setShowCartTrue } = useCartStore()
    const { addToWishList, removeFromWishlist, wishlistData } = useWishlistStore()
    let see = cartData?.map((item) => item.product._id.toString())
    let see2 = wishlistData?.map((item) => item._id.toString())
    const isInCart = see.includes(productId)
    const isInWishList = see2.includes(productId)
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [loadingWishlistId, setLoadingWishlistId] = useState(null)


    const handleAddToCart = async (productId) => {
        if (!userId) {
            alert("Please Login Before Add To Cart!")
            setTimeout(() => {
                redirectFromSSR("/login")
            }, 3000)
            return;
        }
        try {
            setLoadingProductId(productId)
            await addToCart(userId, "single_add", productId);
        } catch (err) {
            alert("Something Went Wrong")
        } finally {
            setLoadingProductId(null)
        }
    };

    const handleAddToWishlist = async (productId) => {
        if (!userId) {
            alert("Please Login Before Add To Cart!")
            setTimeout(() => {
                redirectFromSSR("/login")
            }, 3000)
            return;
        }
        try {
            setLoadingWishlistId(productId)
            if (isInWishList) {
                await removeFromWishlist(userId, productId);
            } else {
                await addToWishList(userId, productId);
            }
        } catch (err) {
            alert("Something Went Wrong")
        } finally {
            setLoadingWishlistId(null)
        }
    };

    return (
        <>
            <div className="flex justify-between px-1 items-center w-full">
                {isInCart ? (
                    <button
                        className="btn bg-indigo-500 text-white px-4 py-2 mt-1 text-nowrap rounded-lg flex gap-2 justify-center items-center flex-1 hover:bg-indigo-700 transition-colors"
                        onClick={setShowCartTrue}
                    >
                        <BsCart3 /> View Cart
                    </button>
                ) : loadingProductId === productId ? (
                    <button
                        className="btn bg-black relative text-white px-4 py-2 mt-1 text-nowrap rounded-lg flex gap-2 justify-center items-center flex-1 overflow-hidden"
                        disabled
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <BsCart3 /> Adding<span className="loading loading-dots loading-md"></span>
                        </span>
                        <span className="absolute inset-0 bg-indigo-500 animate-fillUp z-0"></span>
                    </button>
                ) : (
                    <button
                        className="btn bg-black text-white px-4 py-2 mt-1 text-nowrap rounded-lg flex gap-2 justify-center items-center flex-1 hover:bg-blue-700 transition-colors"
                        onClick={() => handleAddToCart(productId)}
                    >
                        <BsCart3 /> Add To Cart
                    </button>
                )}
                <button
                    className="ml-2 p-2 rounded-full hover:bg-gray-200 transition-colors overflow-hidden flex items-center justify-center"
                    onClick={() => handleAddToWishlist(productId)}
                    disabled={loadingWishlistId === productId}
                >
                    {loadingWishlistId === productId ? (
                        <span className=" loading loading-ring text-pink-500 size-10"></span>
                    ) : (
                        <IoHeartCircleOutline
                            className={`w-10 h-10  ${isInWishList ? "fill-pink-600" : "fill-black"}`}
                        />
                    )}
                </button>

            </div>
        </>)
}


export default AddToCartBtn