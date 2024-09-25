'use client'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const WishlistViewProfile = () => {
  const [wishItems,setWishItems]= useState([])

  useEffect(()=>{
    const fetchData = async()=>{
    try {
        const response = await axios.get('https://shoaib-e-commerce.vercel.app/api/wishlist')
        setWishItems(response.data.wishlist || [])
      }  
    catch (error) {
      console.log("error to failed wishlist data",error)
    }
  }
    fetchData()
  },[])
  return (
    <>
    <ul>
                                {wishItems.length > 0 ? (
                                    wishItems.map((product) => (
                                <li key={product.productIdw} className="mb-2">
                                    <div className="flex justify-between">
                                        <span>{product.productTitlew}</span>
                                        <Link href={'/wishlist'}><button className="text-blue-500">View</button></Link>
                                    </div>
                                </li>
          ))):(<>
            <h3 className="text-center mt-[1rem] text-2xl font-bold  text-black col-span-1 md:col-span-2 lg:col-span-3">
              Your Wishlist Is Empty. <Link href={'/'}><span className='text-red-600 hover:underline'>Add Products</span></Link> 
            </h3>
            </>
          )}
    </ul>
    </>
  )
}

export default WishlistViewProfile
