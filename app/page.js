import React from 'react'
import ProductsCard from './components/ProductsCard'
import Category from './components/CategorySection'
import Hero from './components/Hero'

const Home = () => {
  return (
    <>

      <div className='container mx-auto'>
        <div className='py-4'>
          <Hero/>
        </div>
        <div className="border border-gray-200 px-2 sm:px-3 md:px-4">
          <h2 className="text-xl font-bold px-3 mt-2">New Products</h2>
          <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
            <ProductsCard />
          </div>
        </div>
        <Category />
      </div>
    </>
  )
}

export default Home