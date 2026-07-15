<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import image from "../Logo/Logo.png"

const Footer = () => {


  return (
    <footer className='text-white'>
      <div className='px-[205px] bg-[#002244] py-10'>
        <div className='flex justify-start items-center gap-10'>
          <div>
            <img src={image} alt='image' className='h-14 w-[160px]' />
          </div>
          <div>
            <h1>স্বাস্থ্য | তথ্য | সহায়ক | সেবা</h1>
          </div>
        </div>
        <div className='flex justify-between items-start'>
          <div className='gap-2 flex flex-col text-[13px] pl-[200px] pt-5'>
=======
import React from "react";
import image from "../Logo/Logo.png";

const Footer = () => {
  return (
    <footer className="text-white bg-[#002244]">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Logo + Tagline */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
          <img src={image} alt="logo" className="h-12 w-auto" />

          <h1 className="text-sm md:text-base font-medium">
            স্বাস্থ্য | তথ্য | সহায়ক | সেবা
          </h1>
        </div>

        {/* Middle Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Links */}
          <div className="flex flex-col gap-2 text-sm items-center text-center">
>>>>>>> master
            <a href="#">আমাদের সম্পর্কে</a>
            <a href="#">ব্যবহারের নীতিমালা</a>
            <a href="#">সম্পাদনা নীতিমালা</a>
            <a href="#">বিজ্ঞাপন নীতিমালা</a>
<<<<<<< HEAD
            <a href='#'>গোপনীয়তা নীতি</a>
            <a href='#'>ডিসক্লেইমার</a>
          </div>

          <div>
            <div className='flex justify-start items-center gap-2'>
              <input type="email" placeholder="you@example.com" className='rounded p-1.5 focus:outline-none' />
              <button className='px-3 py-1.5 border rounded-lg bg-[#00B3B3] '>সাবস্ক্রাইব</button>
            </div>
            <div className='pt-5 flex justify-start items-center gap-4'>
                <div className="w-5 h-5 text-blue-600 border-white border rounded bg-[#002244]"></div>
                <div className="w-5 h-5 text-blue-600 border-white border rounded bg-[#002244]"></div>
                <div className="w-5 h-5 text-blue-600 border-white border rounded bg-[#002244]"></div>
                <div className="w-5 h-5 text-blue-600 border-white border rounded bg-[#002244]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center p-5 bg-[#4B4B4B] text-white'>
        <p>কপিরাইট ২০২৫ @কেয়ারকানেক্ট বাংলাদেশ লিঃ</p>
      </div>
    </footer>
  )
}

export default Footer
=======
            <a href="#">গোপনীয়তা নীতি</a>
            <a href="#">ডিসক্লেইমার</a>
          </div>

          {/* Subscribe + Social */}
          <div className="flex flex-col gap-5">

            {/* Subscribe */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full sm:w-auto flex-1 rounded px-3 py-2 text-black focus:outline-none"
              />
              <button className="px-4 py-2 bg-[#00B3B3] rounded-lg">
                সাবস্ক্রাইব
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded border border-white"></div>
              <div className="w-8 h-8 rounded border border-white"></div>
              <div className="w-8 h-8 rounded border border-white"></div>
              <div className="w-8 h-8 rounded border border-white"></div>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#4B4B4B] text-center py-4 text-sm">
        কপিরাইট ২০২৫ @কেয়ারকানেক্ট বাংলাদেশ লিঃ
      </div>
    </footer>
  );
};

export default Footer;
>>>>>>> master
