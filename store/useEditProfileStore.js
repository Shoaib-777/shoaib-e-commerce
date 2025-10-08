import { create } from "zustand";

export const useEditProfileStore = create((set,get)=>({
    showEdit:false,
    toggleEditTrue:()=>{
        set({showEdit:true})
    },
    toggleEditFalse:()=>{
        set({showEdit:false})
    }
}))