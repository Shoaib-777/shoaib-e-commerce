"use client";
import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

const DropDownMenu = () => {
  const [showDropDown,setShowDropDown]=useState(false)
  const [category,setCateGory]=useState("")
  const cat = ["men's wearing","womens wearing","electronics","wear ables"]
  return (
    <div className='w-full border border-gray-300 rounded-lg min-w-[200px] px-2 py-1 relative z-20 group'>
      <div onClick={()=>setShowDropDown(true)} className='flex justify-between items-center gap-x-2'>
        <div className={` capitalize ${category && "text-sky-400"} `}>{category || "Category"}</div>
        <div>
          <IoIosArrowDown className='group-hover:rotate-180'/>
        </div>
      </div>
      <div className={`border border-gray-300 rounded-lg w-full z-20  absolute left-0 top-10  flex-col justify-center items-start bg-white text-base gap-y-1 ${showDropDown ? "flex":"hidden"}`}>
        {cat.map((v,i)=>(
          <span key={i} onClick={()=>{setShowDropDown(false);setCateGory(v)}} className='hover:text-sky-400 hover:bg-gray-100 w-full px-2  py-1 capitalize text-nowrap first:rounded-t-lg last:rounded-b-lg'>{v}</span>
        ))}
      </div>
      <div onClick={()=>setShowDropDown(false)} className={`absolute ${showDropDown ? "block":"hidden"} -top-40 -right-10 w-screen h-screen z-10`}>
      </div>
    </div>
  )
}

export default DropDownMenu