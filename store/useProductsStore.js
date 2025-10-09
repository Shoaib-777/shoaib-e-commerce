import { axiosInstance } from "@/axios/axios";
import { create } from "zustand";

export const useProductStore = create((set,get)=>({
    isLoading:false,
    ProductsData:[],
    getAllProductData:async()=>{
        try {
            const {data}  = await axiosInstance.get("/products")
            // console.log(data.data)
            set({ProductsData:data.data})
        } catch (error) {
            console.log("error fetching products data",error)
        }
    }
}))