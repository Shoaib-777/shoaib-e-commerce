'use client'
import React, { useEffect, useState } from 'react'
import { FetchCatrgory } from '../lib/data'
import Link from 'next/link'
import { BiArrowToRight } from 'react-icons/bi'

const Category = async() => {
  const [categoryData,setCategoryData]=useState([])
useEffect(()=>{
FetchCatrgory()
},[])
  const FetchCatrgory = async () => {
    const res = await axios.get(`http://localhost:3000/api/allproducts`)
    setCategoryData( res.data.categories)
}
  const ImageURLS = [ '/images/electronics.jpg','/images/jewelery.jpg',`/images/men's clothing.jpg`,`/images/women's clothing.jpeg`
  ]
  return (
    <>
    <div className='border-b-2 border-gray-200 mt-2 mb-4'>
      <div className='flex justify-between'>
        <h1 className='font-bold ml-6 mt-2 text-xl'>Category</h1> <BiArrowToRight className='w-10 h-10  sm:hidden'/>
      </div>
        <div className='mx-auto py-2 px-4 flex gap-3 lg:justify-center overflow-x-scroll scrollbar-hide mb-4'>
            {/* <CategoryCard/>s */}
            {categoryData.map((v,i)=>{
              
              const imageUrl = ImageURLS[i] || `/images/default.jpg`;
          return(
            <>

          <div key={i} className='w-[300px] h-[300px] border border-gray-200 flex flex-col justify-center items-center shadow-lg px-2 shrink-0 '>
                <Link href={`/category/${v}`}><img src={imageUrl} alt="no category found" className='w-[250px] h-[250px] object-contain ' />
                <h4 className='font-bold text-xl mt-2  mr-4'>{v}</h4></Link>
            </div>
            </>
             )
            })}
        </div>
    </div>
    </>
  )
}

export default Category