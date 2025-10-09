"use server"

import { axiosInstance } from "@/axios/axios"



export const getAllProducts = async () => {
    try {
        const res = await axiosInstance.get("/products")
        return res.data.data
    } catch (error) {
        console.log("error fetching Products data", error)
    }
}

export const getSingleProduct = async (id) => {
    try {
        const res = await axiosInstance.get(`/products/${id}`)
        return res.data.data
    } catch (error) {
        console.log("error fetching user cart data", error)
    }
}

export const getUserWishList = async (id) => {
    try {
        const res = await axiosInstance.get(`/wishlist/${id}`);
        const all = res.data.data[0].products || [];
        // console.log("iam at server get user wishlist",all)
        return all;
    } catch (error) {
        console.log("error fetching user wishlist", error);
        return [];
    }
};

export const getUserCartItems = async (id) => {
    try {
        const res = await axiosInstance.get(`/cart/${id}`)
        return res.data.data.items
    } catch (error) {
        console.log("error fetching user cart data", error)
    }
}

export const getSingleUser = async (id) => {
    try {
        const res = await axiosInstance.get(`/userdetails/${id}`)
        return res.data.data
    } catch (error) {
        console.log("error fetching user cart data", error)
    }
}

export const getUserOrders = async (id) => {
    try {
        const res = await axiosInstance.get(`/order/${id}`)
        return res.data.data

    } catch (error) {
        console.log("error fetching user cart data", error)
    }
}