import { axiosInstance } from "@/axios/axios";
import { create } from "zustand";

export const useWishlistStore = create((set, get) => ({
    isLoading: false,
    wishlistData: [],
    getWishList: async (id) => {
        if (!id) {
            return console.warn("user id is required");
        }
        try {
            set({ isLoading: true })
            const { data } = await axiosInstance.get(`/wishlist/${id}`)
            console.log("iam wishlist data", data.data[0].products)
            set({ wishlistData: data.data[0].products })
        } catch (error) {
            console.log("error fetching user wishlist", error)
        } finally {
            set({ isLoading: false })
        }
    },
    addToWishList: async (userId, productId) => {
        if (!userId || !productId) {
            return console.log("user id and product id required")
        }
        try {
            const { data } = await axiosInstance.post("/wishlist", { userId, productId })
            console.log("add to wishlist", data)
        } catch (error) {
            console.log("error add to wishlist ", error)
        }
    },
    removeFromWishlist: async (userId, productId) => {
        if (!userId || !productId) {
            return console.log("user id and product id required")
        }
        try {
            const currentWishlist = get().wishlistData;
            const { data } = await axiosInstance.delete("/wishlist", {
                data: { userId, productId },
            })
            if(data.status === "ok"){
                set({wishlistData: currentWishlist.filter((item)=>item._id !== productId)})
            }
        } catch (error) {
            console.log("error removing from wishlist ", error)
        }
    }

}))