// import Link from "next/link";
// import AddToCartButton from "../component/AddToCartButton";

// // Helper function to shuffle array
// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// // Fetch products
// const fetchProducts = async () => {
//   try {
//     const res = await fetch('https://shoaib-e-commerce.vercel.app/api/allproducts'); // Adjust the URL as needed
//     if (!res.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await res.json();
//     return data.products || []; // Adjust based on the structure of your API response
//   } catch (error) {
//     console.error('Failed to fetch products', error);
//     return [];
//   }
// };

// const Products = async() => {
//   const productsf = await fetchProducts();
//   const ShufflesProducts = shuffleArray(productsf);

//   if (!ShufflesProducts.length) {
//     return <div>Loading...</div>; // Display "Loading..." if no products are available
//   }

//   return (
//     <div className="border border-gray-200 px-4">
//       <h2 className="text-xl font-bold ml-6 mt-2">New Products</h2>
//       <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
//         {ShufflesProducts.map((product, i) => (
//           <div className="" key={i}>
//             <div className="mx-auto px-3 py-4 w-[270px] h-[455px] overflow-hidden shadow-lg">
//               <Link href={`/products/${product.id}`}>
//                 <div className="overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt="no product found"
//                     className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125"
//                   />
//                 </div>
//                 <div className="flex justify-between items-center px-1 mt-2">
//                   <h4 className="text-red-600 font-semibold text-[16px] tracking-tighter">
//                     {product.category}
//                   </h4>
//                   <h4 className="font-bold text-[16px]">
//                     <span>${product.price}</span>{" "}
//                     <span className="line-through text-gray-500">
//                       ${product.price * 2}
//                     </span>
//                   </h4>
//                 </div>
//                 <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1">
//                   {product.title}
//                 </h3>
//                 <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter text-wrap">
//                   {product.description}
//                 </p>
//               </Link>
//               <AddToCartButton product={product} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;
'use client'
import Link from "next/link";

import AddToCartButton from "../component/AddToCartButton"; // Update the import path if needed
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Products =() => {
  const [allproducts,setAllProducts]=useState([])
  const [loading,setLoading]= useState(true)

  useEffect(()=>{
    const handleAllProdcuts = async()=>{
  const res = await axios.get(`https://shoaib-e-commerce.vercel.app/api/allproducts`)
  setAllProducts( res.data.products)
  setLoading(false)

    }
    handleAllProdcuts()
  },[])
  const ShufflesProducts = shuffleArray(allproducts);
  if(loading)
    return(
<>
<div className="w-full flex justify-center items-center">
    <Image src={'/images/loadingGif.gif'} alt="Loading..." width={60} height={60}/>
</div>
</>
)
  return (
    <>
      <div className="border border-gray-200 px-4">
        <h2 className="text-xl font-bold ml-6 mt-2">New Products</h2>
        <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
          {ShufflesProducts.map((product, i) => (
            <div key={i}>
              <div className="mx-auto px-3 py-4 w-[270px] h-[455px] overflow-hidden shadow-lg">
                <Link href={`/products/${product.id}`}>
                  <div className="overflow-hidden">
                    <img
                      src={product.image}
                      alt="no product found"
                      className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125"
                    />
                  </div>
                  <div className="flex justify-between items-center px-1 mt-2">
                    <h4 className="text-red-600 font-semibold text-[16px] tracking-tighter">
                      {product.category}
                    </h4>
                    <h4 className="font-bold text-[16px]">
                      <span>${product.price}</span>{" "}
                      <span className="line-through text-gray-500">
                        ${product.price * 2}
                      </span>
                    </h4>
                  </div>

                  <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1 ">
                    {product.title}
                  </h3>
                  <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter text-wrap">
                    {product.description}
                  </p>
                </Link>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;



// import Link from "next/link";
// import { FetchProduct } from "../lib/data";
// import AddToCartButton from "../component/AddToCartButton";

// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// const Products = async() => {
//   const productsf = await FetchProduct();
//   const ShufflesProducts = shuffleArray(productsf)
// return (
//     <>
//       <div className="border border-gray-200 px-4">
//         <h2 className="text-xl font-bold ml-6 mt-2">New Products</h2>
//         <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
//           {ShufflesProducts.map((product, i) => (
//             <div className="" key={i}>
//               <div className="mx-auto px-3 py-4 w-[270px] h-[455px] overflow-hidden shadow-lg">
//                 <Link href={`/products/${product.id}`}><div className="overflow-hidden">
//                   <img src={product.image} alt="no product found" className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125" />
//                 </div>
//                 <div className="flex justify-between items-center px-1 mt-2">
//                   <h4 className="text-red-600 font-semibold text-[16px] tracking-tighter">{product.category}</h4>
//                   <h4 className="font-bold text-[16px]"><span>${product.price}</span> <span className="line-through text-gray-500">${product.price * 2}</span></h4>
//                 </div>
                
//                 <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1 ">{product.title} </h3>
//                 <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter text-wrap ">{product.description}</p></Link>
//                              <AddToCartButton product={product} />                                   
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Products;