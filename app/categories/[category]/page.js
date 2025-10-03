import DropdownMenu from '@/app/components/DropDownMenu'
import ProductsCard from '@/app/components/ProductsCard'
import React from 'react'

const Categories = () => {
  return (
    <div className='min-h-screen w-full'>
      <div className='container mx-auto flex justify-between items-center p-2 sm:p-4 md:text-lg'>
        <div>
          <span className='font-semibold '>Total Products: <span className='text-red-600'>12</span></span>
        </div>
        <div className='mr-3 sm:mr-6'>
          {/* <select name="" id="" className='border border-gray-300 rounded-lg px-2 py-1 font-semibold outline-none'>
            <option value="">Mens Clothing</option>
            <option value="">Womens Clothing</option>
          </select> */}
          <DropdownMenu/>
        </div>
      </div>
      <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
        <ProductsCard />
      </div>
    </div>
  )
}

export default Categories