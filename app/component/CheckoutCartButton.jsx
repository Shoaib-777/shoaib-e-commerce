'use client'

import Link from "next/link"

const CheckoutCartButton = ({setCart}) => {
    return (
        <div className="w-[85%] mx-auto">
            <Link href={'/checkout'}><button
            className="text-black bg-white font-bold hover:bg-black hover:text-white hover:duration-500 w-full px-4 py-1 rounded-2xl mb-2 text-center text-nowrap"
            onClick={()=>setCart(false)}
            >Check Out</button></Link>
        </div>
    )
}

export default CheckoutCartButton