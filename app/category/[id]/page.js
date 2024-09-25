"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import AddToCartButton from "@/app/component/AddToCartButton";
import Link from "next/link";

const Skeleton = () => (
  <div className="animate-pulse">
    <div className="mx-auto px-3 py-4 w-[270px] h-[455px] overflow-hidden shadow-lg">
      <div className="bg-gray-300 w-[250px] h-[250px] object-contain border border-gray-200 px-2"></div>
      <div className="flex justify-between items-center px-1 mt-2">
        <div className="bg-gray-300 w-1/3 h-6"></div>
        <div className="bg-gray-300 w-1/4 h-6"></div>
      </div>
      <div className="bg-gray-300 w-full h-6 mt-2"></div>
      <div className="bg-gray-300 w-full h-[50px] mt-2"></div>
      <div className="bg-gray-300 w-full h-10 mt-2"></div>
    </div>
  </div>
);

const Category = () => {
  const pathname = usePathname();
  const paths = pathname.split('/');
  const id = paths[paths.length - 1];

  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/allproducts/category/${id}`);
        const categoryObject = res.data.productsCategory;
        const products = categoryObject[0]?.products || []; 
        setCategoryData(products || []);
        // console.log("Category data:", products);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="border border-gray-200 px-4">
        <h2 className="text-xl font-bold ml-6 mt-2">Loading...</h2>
        <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>Error loading data</p>;

  return (
    <>
      <div className="border border-gray-200 px-4">
        <h2 className="text-xl font-bold text-center mt-2">Category Products</h2>
        <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
          {categoryData.map((product, i) => (
            <div key={i}>
              <div className="mx-auto px-3 py-4 w-[270px] h-[455px] overflow-hidden shadow-lg">
                <Link href={`/products/${product.id}`}><div className="overflow-hidden">
                  <img src={product.image} alt='no image found' className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125 transition-transform duration-200" />
                </div>
                <div className="flex justify-between items-center px-1 mt-2">
                  <h4 className="text-red-600 font-semibold text-[16px]">{product.category}</h4>
                  <h4 className="font-bold text-[16px]">
                    <span>${product.price}</span>
                    <span className="line-through text-gray-500 ml-1">${(product.price * 1.2).toFixed(2)}</span>
                  </h4>
                </div>
                <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1 ">{product.title}</h3>
                <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter">{product.description}</p></Link>
                <div className=""><AddToCartButton product={product}/></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;


