import { axiosInstance } from "@/axios/axios";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
    isLoading: false,
    cartData: [],
    showCart:false,
    setShowCartTrue:()=>{
        set({showCart:true})
    },
    setShowCartFalse:()=>{
        set({showCart:false})
    },
    getCartData: async (id) => {
        if (!id) {
            return console.log("user id is required at getcartdata fn")
        }
        try {
            set({ isLoading: true })
            const res = await axiosInstance.get(`/cart/${id}`)
            set({ cartData: res.data.data.items })
            console.log(res.data.data)
        } catch (error) {
            console.log("error fetching user cart data", error)
        } finally {
            set({ isLoading: false })
        }
    },
    addToCart: async (userId, type, productId, productsId) => {
        if (!userId) return console.warn("User ID is required");

        try {
            set({ isLoading: true });

            const payload = { userId, type };
            if (type === "single_add") payload.productId = productId;
            else if (type === "multiple_add") payload.productsId = productsId;

            const { data } = await axiosInstance.post("/cart", payload);
            if (data.message) console.log(data.message);
            return data.message;

        } catch (error) {
            console.error("Error adding to cart:", error);
        } finally {
            set({ isLoading: false });
        }
    },


    updateQuantity: async (userId, itemId, action) => {
        console.log("iam payload", userId, itemId, action)
        try {
            const currentCart = get().cartData;
            const item = currentCart.find((i) => i._id === itemId);
            if (!item) return console.warn("Item not found in cart");

            const newQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;

            const { data } = await axiosInstance.patch(`/cart`, { userId, itemId, action });

            if (data.status === "ok") {
                // Update local state
                set({
                    cartData: currentCart.map((i) =>
                        i._id === itemId ? { ...i, quantity: newQuantity } : i
                    ),
                });
            }
        } catch (error) {
            console.error("Update cart error:", error);
        }
    },
    removeFromCart: async (userId, itemId, action) => {
        if (!userId || !action || (action === "deleteone" && !itemId)) {
            return console.log("userId, itemId (for deleteone), and action are required");
        }
        try {
            const currentCart = get().cartData;
            const { data } = await axiosInstance.put("/cart", { userId, itemId, action });

            if (data.status === "ok") {
                if (action === "deleteone") {
                    set({ cartData: currentCart.filter((item) => item._id !== itemId) });
                } else if (action === "clearcart") {
                    set({ cartData: [] });
                }
            } else {
                alert("Something went wrong updating the cart");
            }
        } catch (error) {
            console.log("Error removing from cart", error);
        }
    },

}))