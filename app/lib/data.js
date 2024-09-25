import axios from "axios"

export const FetchProduct = async () => {
    const res = await axios.get(`http://localhost:3000/api/allproducts`)
    return res.data.products
}
export const FetchCatrgory = async () => {
    const res = await axios.get(`http://localhost:3000/api/allproducts`)
    return res.data.categories
}
export const FetchWishlistProducts = async () => {
    const res = await axios.get(`http://localhost:3000/api/wishlist`)
    return res.data.wishlist
} 
 