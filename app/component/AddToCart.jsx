import NewDeleteButton from "./NewDeleteButton";
import Link from "next/link";
import IncreaseDecrease from "./IncreaseDecrease";
import CheckoutCartButton from "./CheckoutCartButton";

const AddToCart = ({ cartsData, setCartsData,setCart }) => {
  // Check if cartsData is undefined or empty
  if (!cartsData || cartsData.length === 0) {
    return (
      <h3 className="text-center mt-[6rem] text-2xl font-bold h-[80vh] text-black col-span-1 md:col-span-2 lg:col-span-3">
        No items were added to the cart.
      </h3>
    );
  }

  const cartTotal = cartsData.reduce((total, product) => {
    return total + product.productPrice * product.productQuantity;
  }, 0);

  const discountPercentage = 0.2; // 20% discount
  const discountAmount = cartTotal * discountPercentage;
  const discountedTotal = cartTotal - discountAmount;

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-3">Shopping Cart</h1>
        <h3 className="font-bold text-2xl mb-2">
          {cartsData.length} Items <span className="font-semibold text-xl">in your cart</span>
        </h3>
        <div className="container flex flex-wrap sm:flex-row mx-auto sm:gap-x-5">
          <div className="w-full sm:w-[65%] shadow-xl rounded-xl py-1">
            {cartsData.map((product, index) => (
              <div key={product.productId} className="bg-white w-full sm:w-[100%] px-4 mb-1 flex justify-evenly items-center gap-x-1 py-1">
                <div className="min-w-[50px] min-h-[50px] border border-gray-300 shadow-2xl py-1 rounded-xl">
                  <img src={product.productImage} alt="no image found" className="w-[100px] h-[100px] object-contain" />
                </div>
                {/* <div className="flex items-center gap-x-2 md:gap-x-4">
                  <button><FaMinus className="border border-black p-1 text-2xl font-bold fill-red-500" /></button>
                  <span className="font-semibold">{product.productQuantity}</span>
                  <button><IoMdAdd className="border border-black p-1 text-2xl font-bold fill-blue-600" /></button>
                </div> */}
                <IncreaseDecrease product={product} setCartsData={setCartsData}/>
                <div>
                  <h3 className="font-semibold">${product.productPrice}</h3>
                </div>
                <div className="flex items-center justify-between gap-x-2">
                  <div>
                    <Link href={`/products/${product.productId}`}>
                      <button className="px-4 py-1 bg-green-600 hover:bg-green-800 text-white font-bold">View</button>
                    </Link>
                  </div>
                  <div>
                    <NewDeleteButton 
                      cartsData={cartsData}           
                      setCartsData={setCartsData}
                      product={product} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white shadow-xl w-full sm:w-[30%] h-[236px] rounded-xl px-2 py-2 border border-black">
            <div className="bg-orange-400 rounded-xl px-4 py-2">
              <h2 className="font-bold text-2xl mb-4">Cart Total</h2>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>Total Items</span> <span className="font-bold">{cartsData.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Price</span> <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between relative">
                  <span>Discount <span className="border border-black bg-red-600 text-xs font-bold absolute top-[-3px] left-[66px]">20 %</span></span>
                  <span className="font-bold">-{discountAmount.toFixed(2)}</span>
                </div>
                <hr className="border border-black" />
                <div className="flex items-center justify-between mb-2">
                  <span>Total Price</span> <span className="font-bold">${discountedTotal.toFixed(2)}</span>
                </div>
                <CheckoutCartButton setCart={setCart}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;

