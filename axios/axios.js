import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://shoaib-e-commerce.vercel.app/api"
})
// export const axiosInstance = axios.create({
//     baseURL: process.env.NODE_ENV === "production" ? "https://shoaib-e-commerce.vercel.app/api" : "http://localhost:3000/api"
// })