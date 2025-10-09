import React from 'react'
import ProductsCard from './components/ProductsCard'
import Category from './components/CategorySection'
import HeroCSR from './components/HeroCSR';

export const metadata = {
  title: "Home | FlashCart",
  description: "Welcome Find The Latest Products To Buy At Low Prices",
};


export const dynamic = 'force-dynamic'; 
const Home = async () => {
  return (
    <>

      <div className='container mx-auto'>
        <div className='py-4'>
          <HeroCSR />
        </div>
        <div className="border border-gray-200 px-2 sm:px-3 md:px-4">
          <h2 className="text-xl font-bold px-3 mt-2">New Products</h2>
            <ProductsCard />
        </div>
        <Category />
      </div>
    </>
  )
}

export default Home