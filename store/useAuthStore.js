import  { create } from "zustand"

export const userAuthStore= create((get,set)=>({
    userId:null,
    isAuthenticated:false
}))