import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"https://shoaib-e-commerce.vercel.app/api"
})