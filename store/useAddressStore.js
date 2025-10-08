import { create } from "zustand";
import { axiosInstance } from "@/axios/axios";

export const useAddressStore = create((set, get) => ({
  isLoading: false,
  SavedAddresses: [],

  // ✅ 1. Fetch all user addresses
  getUserAddress: async (userId) => {
    if (!userId) return console.warn("User ID is required at getUserAddress");

    try {
      set({ isLoading: true });
      const { data } = await axiosInstance.get(`/address/${userId}`);
      console.log(data.data)
      set({ SavedAddresses: data.data.addresses || [] });
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ 2. Add new address
  addNewAddress: async (addressData) => {
    try {
      set({ isLoading: true });

      const { data } = await axiosInstance.post("/address", addressData);

      if (data.message) console.log(data.message);

      // Refresh addresses list (optional)
      if (addressData.user) await get().getUserAddress(addressData.user);

      return data;
    } catch (error) {
      console.error("Error adding new address:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ 3. Update address
  updateAddress: async (id, updatedFields) => {
    if (!id) return console.warn("Address ID is required to update");

    try {
      set({ isLoading: true });

      const { data } = await axiosInstance.put("/address", { id, ...updatedFields });

      // Update state locally
      set((state) => ({
        SavedAddresses: state.SavedAddresses.map((addr) =>
          addr._id === id ? data : addr
        ),
      }));

      return data;
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ 4. Remove address
  removeAddress: async (id, userId) => {
    if (!id) return console.warn("Address ID is required to delete");

    try {
      set({ isLoading: true });

      const { data } = await axiosInstance.delete(`/address/${id}`);

      // Update local state
      set((state) => ({
        SavedAddresses: state.SavedAddresses.filter((addr) => addr._id !== id),
      }));

      // Optional: Refresh full list
      if (userId) await get().getUserAddress(userId);

      return data;
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
