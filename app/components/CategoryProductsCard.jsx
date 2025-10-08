import Link from "next/link";
import AddToCartWrapper from "./AddToCartWrapper";

export default function CategoryProductsCard({ products,session }) {
  return (
    <div className="container mx-auto px-2 py-2 flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-12 ">
      {products.map((item) => (
        <div key={item._id} className=" shrink-0">
          <div className="mx-auto px-3 py-4 w-[270px] max-h-[455px] overflow-hidden shadow-xl border border-gray-300 rounded-xl hover:border-gray-400 transition-all">
            <Link href={`/products/${item._id}`}>
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title || "Product"}
                  className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125 rounded-md transition-transform duration-300"
                />
              </div>

              <div className="flex justify-between items-center px-1 mt-2">
                <span className="inline-block bg-gray-200 text-red-600 font-semibold text-xs px-2 py-1 rounded-full capitalize">
                  {item.category}
                </span>

                <h4 className="font-bold text-[16px]">
                  <span className="text-red-600">₹{item.price}</span>{" "}
                  <span className="line-through text-gray-500">
                    ₹{item.price * 2}
                  </span>
                </h4>
              </div>

              <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1">
                {item.title}
              </h3>

              <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter line-clamp-3">
                {item.description}
              </p>
            </Link>

            <AddToCartWrapper
              productId={item._id.toString()} session={session}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
