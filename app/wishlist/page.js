'use client'; // Add this line

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Wishlist = () => {
  const [wishItems, setWishItems] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const FetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/wishlist");
        // console.log("iam wishlist data",response.data.wishlist)
        setWishItems(response.data.wishlist || []);
        setLoading(false)
      } catch (error) {
        console.log("error to fetch wishlist items", error);
      }
    };
    FetchWishlist();
  }, []);
  const handleAddToCart = async (product) => {
    try {
      // Add product to cart
      const response = await axios.post(`/api/cartjs`, {
        productId: product.productIdw,
        productTitle: product.productTitlew,
        productPrice: product.productPricew,
        productImage: product.productImagew,
        productCategory: product.productCategoryw,
        productDescription: product.productDescriptionw,
        productQuantity: 1,
      });

      if (response.status === 200) {
        // If added successfully, remove the product from wishlist
        handleDeleteAddtocart(product.productIdw);
        toast.success('Product added to cart successfully!');
      }
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      toast.error('Already Added to cart !');
    }
  };

  const handleDelete = async(productIdw)=>{
    try {
      const res = await fetch(`/api/wishlist/${productIdw}`, {method:'DELETE',})
      if(res.ok){
        const newData = wishItems.filter((product)=> product.productIdw !== productIdw)
        setWishItems(newData)
        toast.success('Product deleted successfully!');

      } else {
        const result = await res.json();
        console.error('Failed to delete the product:', result.Message);
      }
    } catch (error) {
      console.error('Failed to delete the product:', error);

  }
  };
  const handleDeleteAddtocart = async(productIdw)=>{
    try {
      const res = await fetch(`/api/wishlist/${productIdw}`, {method:'DELETE',})
      if(res.ok){
        const newData = wishItems.filter((product)=> product.productIdw !== productIdw)
        setWishItems(newData)

      } else {
        const result = await res.json();
        console.error('Failed to delete the product:', result.Message);
      }
    } catch (error) {
      console.error('Failed to delete the product:', error);

  }
  };
  if (loading) return (
    <div className='flex justify-center items-center'>
      <Image width={600} height={315} src='/images/lg.gif' alt="loading" className='' />
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">WishList</h1>
        <ToastContainer/>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {wishItems.length > 0 ? (
          wishItems.map((product) => (
            <div key={product.productIdw} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
              <img
                src={product.productImagew}
                alt="Product Image"
                className="w-[250px] h-[250px] object-contain rounded-md"
              />
              <div className="mt-6">
                <p className="text-lg font-bold">${product.productPricew}</p>
              </div>
              <div className="flex-grow mt-2">
                <p className="text-sm text-gray-500"><span className='text-red-500 font-bold'>Category:</span> {product.productCategoryw}</p>
                <h2 className="text-xl font-bold">{product.productTitlew}</h2>
                <p className="text-gray-600">{product.productDescriptionw}</p>
              </div>
              <div className="flex items-baseline mt-4">
                <button 
                 onClick={()=>handleAddToCart(product)}
                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                  Add To Cart
                </button>
                <button
                onClick={() => handleDelete(product.productIdw)}
                className="ml-auto bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
                Remove
            </button>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center mt-[6rem] text-2xl font-bold  text-black col-span-1 md:col-span-2 lg:col-span-3">
            No items were added to the WishList. <Link href={'/'}><span className='text-red-600 hover:underline'>View Products</span></Link> 
          </h3>
        )}
      </div>
    </div>
  );
};

export default Wishlist;