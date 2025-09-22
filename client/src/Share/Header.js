import { useEffect, useState } from "react";
import image from "../Logo/Logo.png"
import { NavLink } from "react-router-dom";


const Header = () => {

  return (
    <div className='w-full bg-white p-3 shadow-lg top-0 sticky'>
      <div className='flex justify-between items-center'>
        <div className="">
          <NavLink to={`/`}>
            <img src={image} alt={image} className="h-12 w-[120px]" />
          </NavLink>
        </div>
        <div>
          <ul className='flex justify-end items-center gap-6'>
            <li><a href="#">বিশেষজ্ঞ ডাক্তার</a></li>
            <li><a href="#">বিশেষজ্ঞ ডাক্তার</a></li>
            <li><a href="#">নিকটস্থ হাসপাতাল</a></li>
            <li><a href="#">সেবা সমূহ</a></li>
            <li><a href="/login">লগইন</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Header;




