"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";

const DropDownMenu = ({ currentCategory }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [category, setCategory] = useState(currentCategory || "");
  const router = useRouter();

  const categories = ["All","men's clothing", "jewelery", "electronics", "women's clothing"];

  const handleSelect = (value) => {
    setShowDropDown(false);
    setCategory((value));
    router.push(`/categories/${value}`);
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg min-w-[200px] px-2 py-1 relative group">
      <div
        onClick={() => setShowDropDown((prev) => !prev)}
        className="flex justify-between items-center gap-x-2 cursor-pointer"
      >
        <div className={`capitalize ${category && "text-sky-400"}`}>
          {category || "Select Category"}
        </div>
        <IoIosArrowDown
          className={`transition-transform ${
            showDropDown ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {showDropDown && (
        <div className="border border-gray-300 rounded-lg w-full z-20 absolute left-0 top-10 flex flex-col justify-center items-start bg-white text-base gap-y-1 shadow-md">
          {categories.map((v, i) => (
            <span
              key={i}
              onClick={() => handleSelect(v)}
              className="hover:text-sky-400 hover:bg-gray-100 w-full px-2 py-1 capitalize text-nowrap first:rounded-t-lg last:rounded-b-lg cursor-pointer"
            >
              {v}
            </span>
          ))}
        </div>
      )}

      {showDropDown && (
        <div
          onClick={() => setShowDropDown(false)}
          className="fixed inset-0 z-10"
        />
      )}
    </div>
  );
};

export default DropDownMenu;
