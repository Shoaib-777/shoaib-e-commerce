import Link from "next/link";
import { getAllProducts } from "@/utils/DataFetching";
import AddToCartWrapper from "./AddToCartWrapper";
import { Suspense } from "react";
import LoadingComp from "./LoadingComp";

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};


export default async function ProductsCard({ session }) {
  const data = await getAllProducts()
  const shuffledProducts = shuffleArray(data)


  return (
    <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
      <Suspense fallback={<LoadingComp />}>
        {shuffledProducts.map((item, i) => (
          <div key={i}>
            <div className="mx-auto px-3 py-4 w-[270px] max-h-[455px] overflow-hidden shadow-xl border border-gray-300 rounded-xl hover:border-gray-400">
              <Link href={`/products/${item._id}`}>
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt="no product found"
                    className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125 rounded-md"
                  />
                </div>
                <div className="flex justify-between items-center px-1 mt-2">
                  <div>
                    <span className="inline-block bg-gray-200 text-red-600 font-semibold text-xs px-2 py-1 rounded-full capitalize">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-[16px]">
                    <span className="text-red-600">{item.price}</span>{" "}
                    <span className="line-through text-gray-500">
                      {item.price * 2}
                    </span>
                  </h4>
                </div>

                <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter text-wrap line-clamp-3">
                  {item.description}
                </p>
              </Link>
              <AddToCartWrapper
                productId={item._id.toString()} session={session}
              />
            </div>
          </div>
        ))}
      </Suspense>
    </div>

  );
};