import { create } from "zustand";
import { axiosInstance } from "@/axios/axios";

export const useOrderStore = create((set) => ({
  isLoading: false,
  userOrders: [],

  placeOrder: async (orderData) => {
    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.post("/order", orderData);
      set((state) => ({
        userOrders: [...state.userOrders, data.order],
      }));
      return data;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
