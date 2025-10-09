"use client"
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { redirectFromSSR } from '@/utils/ServerActions'
import { useSession } from 'next-auth/react'
import React from 'react'
import { BsCart3 } from 'react-icons/bs'
import { IoHeartCircleOutline } from 'react-icons/io5'

const AddToCartBtn = ({ productId }) => {
    const {data:session} = useSession()
    const userId = session?.user?.id
    const { addToCart, cartData, setShowCartTrue } = useCartStore()
    const { addToWishList, removeFromWishlist, wishlistData } = useWishlistStore()
    let see = cartData?.map((item) => item.product._id.toString())
    let see2 = wishlistData?.map((item) => item._id.toString())
    const isInCart = see.includes(productId)
    const isInWishList = see2.includes(productId)


    const handleAddToCart = async (productId) => {
        if (!userId) {
           alert("Please Login Before Add To Cart!")
            setTimeout(() => {
                redirectFromSSR("/login")
            }, 3000)
            return;
        }

        try {
            await addToCart(userId, "single_add", productId);
        } catch (err) {
            alert("Something Went Wrong")
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

            if (isInWishList) {
                await removeFromWishlist(userId, productId);
            } else {
                await addToWishList(userId, productId);
            }

        } catch (err) {
            alert("Something Went Wrong")
        }
    };

    return (
        <>
            <div className="flex justify-between px-1 items-center w-full">
                {isInCart ? (
                    <button className="bg-indigo-500 text-white px-4 py-2 mt-1 text-nowrap rounded-lg flex gap-2 justify-center items-center text-center flex-1 hover:bg-indigo-700 transition-colors"
                        onClick={setShowCartTrue}
                    >
                        <BsCart3 /> View Cart
                    </button>
                ) : (
                    <button
                        className="bg-black text-white px-4 py-2 mt-1 text-nowrap rounded-lg flex gap-2 justify-center items-center text-center flex-1 hover:bg-blue-700 transition-colors"
                        onClick={() => handleAddToCart(productId)}
                    >
                        <BsCart3 /> Add To Cart
                    </button>
                )}


                <button
                    className="ml-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
                    onClick={() => handleAddToWishlist(productId)}
                >
                    <IoHeartCircleOutline
                        className={`w-10 h-10 ${isInWishList ? "fill-pink-600" : "fill-black"}`}
                    />
                </button>
            </div>
        </>)
}


export default AddToCartBtn