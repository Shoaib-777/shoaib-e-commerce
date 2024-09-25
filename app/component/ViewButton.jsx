'use client'
import Link from 'next/link'

const ViewButton = ({product,setCart}) => {
    return (
        <div>
            <Link href={`/products/${product.productId}`}>
                <button onClick={()=>setCart(false)} className="px-4 py-1 bg-green-600 hover:bg-green-800 text-white font-bold">View</button>
            </Link>
        </div>
    )
}

export default ViewButton