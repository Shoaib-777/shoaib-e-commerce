import ProductsCard from '@/app/components/ProductsCard'
import { getSingleProduct, getUserCartItems, getUserWishList } from '@/utils/DataFetching'
import React from 'react'
import {  getProductsByCategoryWithNotSimilar } from '@/utils/ServerActions'
import CategoryProductsCard from '@/app/components/CategoryProductsCard'
import AddToCartWrapper from '@/app/components/AddToCartWrapper'

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  return {
    title: `${product.title} | FlashCart`,
     description: "Shop the latest deals at FlashCart.",
  };
}

const Products = async ({ params,session }) => {
  const { id } = await params

  const product = await getSingleProduct(id)
  const products = await getProductsByCategoryWithNotSimilar(product);

  return (
    <div className='w-full min-h-screen'>
      <div className='container mx-auto py-4 px-2'>
        <div className='w-full flex flex-col md:flex-row border border-gray-300 rounded-lg gap-y-2 md:gap-y-0 md:gap-x-2 mb-2'>
          <div className='w-full min-w-[250px] md:max-w-1/2 h-[350px] flex justify-center items-center border border-gray-300 rounded-md hover:border-gray-400 '>
            <img src={product?.image} alt="no image" className='w-full h-full object-contain py-2 mix-blend-multiply' />
          </div>
          <div className='py-2 px-4 md:p-6 md:flex md:flex-col justify-between items-center'>
            <div>
              <div className="mb-2 flex justify-between items-center md:hidden">
                <div className=''>
                  <span className="inline-block bg-gray-200 text-red-600 text-xs px-2 py-1 rounded-full capitalize font-semibold">
                    {product?.category}
                  </span>
                </div>
                <div className='font-semibold text-lg md:hidden'>
                  <span className='text-red-600'>${product?.price}</span>{" "}
                  <span className="line-through text-gray-500">
                    {product?.price * 2}
                  </span>
                </div>

              </div>
              <h1 className='text-center font-black text-lg sm:text-xl md:text-2xl lg:text-3xl'>{product?.title}</h1>
              <div className="mb-2 hidden  md:flex justify-between items-center ">
                <div className=''>
                  <span className="inline-block bg-gray-200 text-red-600 text-xs px-2 py-1 rounded-full capitalize font-semibold">
                    {product?.category}
                  </span>
                </div>
                <div className='font-semibold text-lg md:hidden'>
                  <span>${product?.price}</span>{" "}
                  <span className="line-through text-gray-500">
                    {product?.price * 2}
                  </span>
                </div>

              </div>
              <p className='font-medium text-base sm:text-lg md:text-xl'>{product?.description}</p>

              <div className="flex items-center mb-3 py-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`size-7 ${i < Math.floor(product?.rating.rate)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-lg text-gray-600">{product?.rating.rate}</span>
              </div>
              <div className='font-semibold text-xl w-full text-center hidden md:block'>
                <span className='text-red-600'>${product?.price}</span>{" "}
                <span className="line-through text-gray-500">
                  {product?.price * 2}
                </span>
              </div>
            </div>
            <div className='w-full flex justify-center items-center'>
              <AddToCartWrapper
                productId={product._id.toString()} session={session}
              />
            </div>
          </div>
        </div>
        <div className="border border-gray-200 px-2 sm:px-3 md:px-4">
          <h2 className="text-xl font-bold px-3 mt-2">Similar Products</h2>
          <CategoryProductsCard products={products} session={session}/>
        </div>
      </div>
    </div>
  )
}

export default Products