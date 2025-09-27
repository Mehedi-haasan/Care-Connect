import { useEffect, useState } from "react";
import image from "../Logo/Logo.png"
import { NavLink } from "react-router-dom";


const Header = () => {

  return (
    <div className='w-full bg-white p-3 shadow-md top-0 sticky z-50'>
      <div className="px-32">
        <ul className='flex justify-between items-center gap-6 '>
          <li><NavLink to={`/`}>
            <img src={image} alt={image} className="h-14 w-[160px]" />
          </NavLink>
          </li>
          <li><a href="#">স্বাস্থ্য | তথ্য | সহায়ক | সেবা</a></li>
          <li><a href="#" className="text-[#8B61C2]">বিশেষজ্ঞ ডাক্তার</a></li>
          <li><a href="#" className="text-[#8B61C2]">বিশেষজ্ঞ ডাক্তার</a></li>
          <li><a href="#" className="text-[#8B61C2]">নিকটস্থ হাসপাতাল</a></li>
          <li><a href="#" className="text-[#8B61C2]">সেবা সমূহ</a></li>
          <li><a href="/login" className="text-[#8B61C2]">লগইন</a></li>
          <li>
            <div className="flex justify-end items-center gap-1 re">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-2.5 left-3 text-[#A2775A]" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" fill-rule="evenodd" d="m16.622 15.172l4.244 4.244l-1.414 1.415l-4.24-4.24a7 7 0 1 1 1.41-1.42zM16 11a5 5 0 1 0-10 0a5 5 0 0 0 10 0" />
                </svg>
                <input className="border rounded-l-3xl rounded-r-lg bg-[#F4E9DC] p-2" />
              </div>
              <button className="py-2 px-2 border rounded-r-3xl rounded-l-lg bg-[#A2775A] text-white font-thin">Search</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Header;




