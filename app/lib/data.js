import axios from "axios"

export const FetchProduct = async () => {
    const res = await axios.get(`https://shoaib-e-commerce.vercel.app/api/allproducts`)
    return res.data.products
}
export const FetchCatrgory = async () => {
    const res = await axios.get(`https://shoaib-e-commerce.vercel.app/api/allproducts`)
    return res.data.categories
}
export const FetchWishlistProducts = async () => {
    const res = await axios.get(`https://shoaib-e-commerce.vercel.app/api/wishlist`)
    return res.data.wishlist
} 
 