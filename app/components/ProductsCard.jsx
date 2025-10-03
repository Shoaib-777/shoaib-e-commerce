
'use client'
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const ProductsCard = () => {

    return (
        <>
            <div>
                <div className="mx-auto px-3 py-4 w-[270px] max-h-[455px] overflow-hidden shadow-xl border border-gray-300 rounded-xl hover:border-gray-400">
                    <Link href={`/products/1`}>
                        <div className="overflow-hidden">
                            <img
                                src="https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png"
                                alt="no product found"
                                className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125 rounded-md"
                            />
                        </div>
                        <div className="flex justify-between items-center px-1 mt-2">
                            <div className="">
                                <span className="inline-block bg-gray-200 text-red-600 font-semibold text-xs px-2 py-1 rounded-full capitalize">
                                    Women's Clothing
                                </span>
                            </div>
                            <h4 className="font-bold text-[16px]">
                                <span className="text-red-600">$12.99</span>{" "}
                                <span className="line-through text-gray-500">
                                    {12.99 * 2}
                                </span>
                            </h4>
                        </div>

                        <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1 ">
                            DANVOUY Womens T Shirt Casual Cotton Short
                        </h3>
                        <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter text-wrap">
                            95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.
                        </p>
                    </Link>
                    <AddToCartBtn />
                </div>
            </div>
            <div>
                <div className="mx-auto px-3 py-4 w-[270px] max-h-[455px] overflow-hidden shadow-xl border border-gray-300 rounded-xl hover:border-gray-400">
                    <Link href={`/products/1`}>
                        <div className="overflow-hidden">
                            <img
                                src="https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png"
                                alt="no product found"
                                className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125 rounded-md"
                            />
                        </div>
                        <div className="flex justify-between items-center px-1 mt-2">
                            <h4 className="text-red-600 font-semibold text-[16px] tracking-tighter capitalize ">
                                women's clothing
                            </h4>
                            <h4 className="font-bold text-[16px]">
                                <span>$12.99</span>{" "}
                                <span className="line-through text-gray-500">
                                    {12.99 * 2}
                                </span>
                            </h4>
                        </div>

                        <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1 ">
                            DANVOUY Womens T Shirt Casual Cotton Short
                        </h3>
                        <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter text-wrap">
                            95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.
                        </p>
                    </Link>
                    <AddToCartBtn />
                </div>
            </div>
            <div>
                <div className="mx-auto px-3 py-4 w-[270px] max-h-[455px] overflow-hidden shadow-xl border border-gray-300 rounded-xl hover:border-gray-400">
                    <Link href={`/products/1`}>
                        <div className="overflow-hidden">
                            <img
                                src="https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png"
                                alt="no product found"
                                className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125 rounded-md"
                            />
                        </div>
                        <div className="flex justify-between items-center px-1 mt-2">
                            <h4 className="text-red-600 font-semibold text-[16px] tracking-tighter capitalize ">
                                women's clothing
                            </h4>
                            <h4 className="font-bold text-[16px]">
                                <span>$12.99</span>{" "}
                                <span className="line-through text-gray-500">
                                    {12.99 * 2}
                                </span>
                            </h4>
                        </div>

                        <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1 ">
                            DANVOUY Womens T Shirt Casual Cotton Short
                        </h3>
                        <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter text-wrap">
                            95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.
                        </p>
                    </Link>
                    <AddToCartBtn />
                </div>
            </div>
            <div>
                <div className="mx-auto px-3 py-4 w-[270px] max-h-[455px] overflow-hidden shadow-xl border border-gray-300 rounded-xl hover:border-gray-400">
                    <Link href={`/products/1`}>
                        <div className="overflow-hidden">
                            <img
                                src="https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png"
                                alt="no product found"
                                className="w-[250px] h-[250px] object-contain border border-gray-200 px-2 hover:scale-125 rounded-md"
                            />
                        </div>
                        <div className="flex justify-between items-center px-1 mt-2">
                            <h4 className="text-red-600 font-semibold text-[16px] tracking-tighter capitalize ">
                                women's clothing
                            </h4>
                            <h4 className="font-bold text-[16px]">
                                <span>$12.99</span>{" "}
                                <span className="line-through text-gray-500">
                                    {12.99 * 2}
                                </span>
                            </h4>
                        </div>

                        <h3 className="font-bold text-[16px] h-11 w-full overflow-hidden mb-1 ">
                            DANVOUY Womens T Shirt Casual Cotton Short
                        </h3>
                        <p className="text-gray-800 text-[12px] h-[50px] w-full overflow-hidden mb-1 tracking-tighter text-wrap">
                            95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.
                        </p>
                    </Link>
                    <AddToCartBtn />
                </div>
            </div>
        </>
    );
};

export default ProductsCard;