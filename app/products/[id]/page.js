'use client'
import AddToCartButton from '@/app/component/AddToCartButton';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';  // Import Link
import { useState, useEffect } from 'react'

const DetailsPage = ({ params }) => {
  const { id } = params;

  const [singleData, setSingleData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarData, setSimilarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/allproducts/${id}`);
        setSingleData(res.data.productData || []);

        // Fetch similar products after singleData is updated
        const similarRes = await axios.get(`http://localhost:3000/api/allproducts/category/${res.data.productData.category}`);
        const filt = similarRes.data.productsCategory[0].products.filter((product) => product.id !== id);
        setSimilarData(filt);
      } catch (error) {
        setError(error); // Changed from `err` to `error`
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Changed from [params] to [id]

  if (loading) return (
    <div className='flex justify-center items-center'>
      <Image width={600} height={315} src='/images/lg.gif' alt="loading" className='' />
    </div>
  );

  if (error) return <p>Data loading error</p>;

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col justify-center items-center md:flex-row md:w-[100%] mx-auto border-2 border-black rounded-xl">
          <div className="bg-white rounded-lg shadow-md md:min-w-[300px] md:min-h-[600px]">
            <img
              src={singleData.image}
              alt="Product Image"
              className="w-[400px] h-[400px] md:min-w-[300px] md:min-h-[600px] object-contain rounded-md"
            />
          </div>
          <div className="mb-4 md:mb-0 px-[2rem] md:px-[4rem] ">
            <div className="">
              <h3 className="text-xl font-bold text-black">Category: <span className='text-red-500'>{singleData.category}</span></h3>
              <h2 className="text-xl font-bold mb-2">{singleData.title}</h2>
              <p className="text-gray-600">{singleData.description}</p>
            </div>
            <div className="mt-4">
              <span className="text-lg font-bold text-red-500">
                Sale Price <span className="text-blue-600">${singleData.price}</span>
              </span>
              <span className="block md:inline md:ml-[3rem] text-lg font-bold">
                Original Price <span className="line-through decoration-2 decoration-black text-red-700">${singleData.price * 2}</span>
              </span>
            </div>
            <div>
              <AddToCartButton product={singleData} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 px-4">
        <h1 className="text-center font-bold text-3xl">Similar Products</h1>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {similarData.map((product) => (
            <div key={product.id}>
              <div className="mx-auto px-3 py-4 w-[270px] h-[455px] overflow-hidden shadow-lg">
                <Link href={`/products/${product.id}`}>
                  <div className="overflow-hidden">
                    <img
                      src={product.image}
                      alt="No image found"
                      className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex justify-between items-center px-1 mt-2">
                    <h4 className="text-red-600 font-semibold text-[16px]">{product.category}</h4>
                    <h4 className="font-bold text-[16px]">
                      <span>${product.price}</span>
                      <span className="line-through text-gray-500 ml-1">${(product.price * 1.2).toFixed(2)}</span>
                    </h4>
                  </div>
                  <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter">
                    {product.description}
                  </p>
                </Link>
                <div>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
