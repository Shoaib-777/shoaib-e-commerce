import React from 'react'
import { BsCart3 } from 'react-icons/bs'
import { IoHeartCircleOutline } from 'react-icons/io5'

const AddToCartBtn = () => {
    const isInWishList = true
    return (
        <div className="flex justify-between px-1 items-center w-full">
            <button
                className="bg-black text-white px-4 py-2 mt-1 text-nowrap rounded-lg flex gap-2 justify-center items-center text-center flex-1 hover:bg-blue-700  transition-colors"
            // onClick={handleClick} disabled={disableAddToCart}
            >
                <BsCart3 />
                Add To Cart
            </button>
            <button
                className="ml-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
            // onClick={handleClickWishlist} disabled={disablewishlist}
            >
                <IoHeartCircleOutline className={`w-10 h-10 ${isInWishList ? "fill-pink-600" : "fill-black"}`} />
            </button>
        </div>
    )
}

export default AddToCartBtn