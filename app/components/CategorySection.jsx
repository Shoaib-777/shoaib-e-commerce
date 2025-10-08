"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Category = () => {
  const scrollRef = useRef(null);

  const ImageURLS = [
    { category: "men's clothing", image: "/images/electronics.jpg" },
    { category: "jewelery", image: "/images/jewelery.jpg" },
    { category: "electronics", image: "/images/men's clothing.jpg" },
    { category: "women's clothing", image: "/images/women's clothing.jpeg" },
  ];

  // scroll handler
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto min-h-[400px] px-4 py-2 relative">
      <div className="mb-3">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      {/* left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-[40%] left-4 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 lg:hidden"
      >
        <SlArrowLeft size={30} />
      </button>

      {/* scroll container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide space-x-4 xl:justify-center"
      >
        {ImageURLS.map((v, i) => (
          <div
            key={i}
            className="min-w-[300px] max-w-[300px] h-[350px] flex-shrink-0 rounded-md border border-gray-300 shadow-md hover:border-gray-400 hover:shadow-lg flex flex-col justify-center items-center gap-y-3 snap-center"
          >
            <Link href={`/categories/${v.category}`}>
              <img
                src={v.image}
                alt={v.category}
                className="w-[250px] h-[250px] object-contain"
              />
            </Link>
            <h4 className="font-bold capitalize text-xl">{v.category}</h4>
          </div>
        ))}
      </div>

      {/* right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute top-[40%] right-4 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 lg:hidden"
      >
        <SlArrowRight size={30} />
      </button>
    </div>
  );
};

export default Category;


{/* <div className='border-b-2 border-gray-200 mt-2 mb-4 w-full'>
            <div className='flex justify-between sm:justify-baseline '>
                <h1 className='font-bold ml-6 mt-2 text-xl'>Category</h1> <BiArrowToRight className='w-10 h-10  sm:hidden' />
            </div>
            <div className='mx-auto py-2 px-4 flex gap-3 lg:justify-center mb-4 overflow-x-auto snap-x snap-proximity w-full'>
                {ImageURLS.map((v, i) => {
                    return (
                        <div className='mx-auto py-2 px-4 flex gap-3 lg:justify-center mb-4 snap-center'>
                            <div key={i} className='w-[300px] h-[300px] border border-gray-200 flex flex-col justify-center items-center shadow-lg px-2 shrink-0 '>
                                <Link href={`/category/${v.category}`}><img src={v.image} alt="no category found" className='w-[250px] h-[250px] object-contain ' />
                                    <h4 className='font-bold text-xl mt-2  mr-4 capitalize'>{v.category}</h4></Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div> */}