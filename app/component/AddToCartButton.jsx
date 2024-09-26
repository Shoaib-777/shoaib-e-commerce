'use client'
import { IoBagCheckSharp, IoHeartCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from "react";

const AddToCartButton = ({ product }) => {
    const [inWishList, setInWishList] = useState([]);
    const [cartData,setCartsData]=useState([])
    const [disableAddToCart,setDisableAddToCart]=useState(false)
    const [disablewishlist,setDisableWishlist]=useState(false)
    const NewWishlistData = async () => {
        try {
            const res = await axios.get('https://shoaib-e-commerce.vercel.app/api/wishlist')
            setInWishList(res.data.wishlist || [])
        } catch (error) {
            console.error("Error fetching Alerady Exist wishlist products:", error);
        }
    };

    const fetchCartData = async ()=>{
        try {
            const res = await axios.get("https://shoaib-e-commerce.vercel.app/api/cartjs")
            setCartsData(res.data.products || [])
        } catch (error) {
            console.log("Error Fetching Already Exist Cart products",error)
        }
    }
    
    useEffect(() => {
        NewWishlistData();
        fetchCartData()
    }, [cartData,inWishList,disablewishlist]);

    if (!product || !product.id) {
        return null;
    }

    // Check if the product is already in the wishlist
    const isInWishList = inWishList.some(item => item.productIdw === product.id);
    const isInCart = cartData.some(item => item.productId === product.id)

    const handleClick = async () => {
        try {
            if(isInCart){
                alert("Already Added To Cart")
                return;
            }else if (!isInCart){
                setDisableAddToCart(true)
                const productData = {
                    productId: product.id,
                    productTitle: product.title,
                    productDescription: product.description,
                    productImage: product.image,
                    productCategory: product.category,
                    productPrice: product.price,
                    productQuantity: "1" // Default quantity
                };
                await axios.post('/api/cartjs', { product: productData });
                toast.success("Item Is Added To Cart");
                alert("Product Is Added To Cart")
                setDisableAddToCart(false)
                return
            }
            else{
                toast.error("Please Login First ");
                return
            }
        } catch (error) {
            toast.error("Please Login First ");
        }
    };

    const handleClickWishlist = async () => {
        try {
            if (isInWishList) {
                await axios.delete(`/api/wishlist/${product.id}`);
                toast.success("Removed From Wishlist");
            } else if(!isInWishList) {
                setDisableWishlist(true)
                const wishlistData = {
                    productIdw: product.id,
                    productTitlew: product.title,
                    productDescriptionw: product.description,
                    productImagew: product.image,
                    productCategoryw: product.category,
                    productPricew: product.price
                };
                await axios.post('/api/wishlist', { wishlist: wishlistData });
                toast.success("Added To Wishlist");
                setDisableWishlist(false)
            }
            else{
            toast.error("Please Login First");
            }
        } catch (error) {
            toast.error("Please Login First");
        }
    };

    return (
        <div className="flex justify-between px-1 items-center">
            <button 
                className="bg-black text-white px-4 py-2 mt-1 text-nowrap rounded-lg flex gap-2 justify-center items-center text-center"
                onClick={handleClick} disabled={disableAddToCart}
            >
                Add To Cart
                <IoBagCheckSharp />
            </button>
            <button 
                className="ml-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
                onClick={handleClickWishlist} disabled={disablewishlist}
            >
                <IoHeartCircleOutline className={`w-10 h-10 ${isInWishList ? "fill-pink-600":"fill-black"}`}/>
            </button>
        </div>
    );
};

export default AddToCartButton;

// 'use client'
// import { IoBagCheckSharp, IoHeartCircleOutline } from "react-icons/io5";
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const AddToCartButton = ({ product }) => {
//     const [inWishList, setInWishList] = useState([]);
//     const [cartData,setCartsData]=useState([])
//     const Router = useRouter();
//     const NewWishlistData = async () => {
//         try {
//             const res = await axios.get('https://shoaib-e-commerce.vercel.app/api/wishlist')
//             setInWishList(res.data.wishlist || [])
//         } catch (error) {
//             console.error("Error fetching Alerady Exist wishlist products:", error);
//         }
//     };

//     const fetchCartData = async ()=>{
//         try {
//             const res = await axios.get("https://shoaib-e-commerce.vercel.app/api/cartjs")
//             setCartsData(res.data.products || [])
//         } catch (error) {
//             console.log("Error Fetching Already Exist Cart products",error)
//         }
//     }
    
//     useEffect(() => {
//         NewWishlistData();
//         fetchCartData()
//     }, [cartData,inWishList]);

//     if (!product || !product.id) {
//         return null;
//     }

//     // Check if the product is already in the wishlist
//     const isInWishList = inWishList.some(item => item.productIdw === product.id);
//     const isInCart = cartData.some(item => item.productId === product.id)

//     const handleClick = async () => {
//         try {
//             if(isInCart){
//                 alert("Already Added To Cart")
//                 return;
//             }else if (!isInCart){
//                 const productData = {
//                     productId: product.id,
//                     productTitle: product.title,
//                     productDescription: product.description,
//                     productImage: product.image,
//                     productCategory: product.category,
//                     productPrice: product.price,
//                     productQuantity: "1" // Default quantity
//                 };
//                 await axios.post('/api/cartjs', { product: productData });
//                 toast.success("Item Is Added To Cart");
//                 alert("Product Is Added To Cart")
//                 return
//             }
//             else{
//                 toast.error("Please Login First ");
//                 Router.push('/login')
//                 return
//             }
//         } catch (error) {
//             toast.error("Please Login First ");
//             Router.push('/login')
//         }
//     };

//     const handleClickWishlist = async () => {
//         try {
//             if (isInWishList) {
//                 await axios.delete(`/api/wishlist/${product.id}`);
//                 toast.success("Removed From Wishlist");
//             } else if(!isInWishList) {
//                 const wishlistData = {
//                     productIdw: product.id,
//                     productTitlew: product.title,
//                     productDescriptionw: product.description,
//                     productImagew: product.image,
//                     productCategoryw: product.category,
//                     productPricew: product.price
//                 };
//                 await axios.post('/api/wishlist', { wishlist: wishlistData });
//                 toast.success("Added To Wishlist");
//                 Router.push('/wishlist');
//             }
//             else{
//             toast.error("Please Login First");
//             Router.push('/login')
//             }
//         } catch (error) {
//             toast.error("Please Login First");
//             Router.push('/login')
//         }
//     };

//     return (
//         <div className="flex justify-between px-1 items-center">
//             <button 
//                 className="bg-black text-white px-4 py-2 mt-1 text-nowrap rounded-lg flex gap-2 justify-center items-center text-center"
//                 onClick={handleClick}
//             >
//                 Add To Cart
//                 <IoBagCheckSharp />
//             </button>
//             <button 
//                 className="ml-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
//                 onClick={handleClickWishlist}
//             >
//                 <IoHeartCircleOutline className={`w-10 h-10 ${isInWishList ? "fill-pink-600":"fill-black"}`} />
//             </button>
//         </div>
//     );
// };

// export default AddToCartButton;
