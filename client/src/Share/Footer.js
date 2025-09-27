import React, { useState, useEffect } from 'react'

const Footer = () => {


  return (
    <footer className='text-white'>
      <div className='px-[205px] bg-[#002244] py-10'>
        <div className='flex justify-start items-center gap-8'>
          <a href="#">ডাক্তারের সাথে কথা বলুন</a>
          <a href="#">স্বাস্থ্য টিপস</a>
          <a href="#">যোগাযোগ</a>
          <a href="#">প্রাইভেসি পলিসি</a>
        </div>
        <p className='py-3'>© 2025 CareConnect Health</p>
        <div className='flex justify-start items-center gap-2'>
          <input type="email" placeholder="you@example.com" className='rounded p-1' />
          <button className='px-3 py-1 border rounded-lg bg-[#00B3B3]'>সাবস্ক্রাইব</button>
        </div>
      </div>
      <div className='flex justify-center items-center p-5 bg-[#4B4B4B] text-white'>
        <p>কপিরাইট ২০২৫ @কেয়ারকানেক্ট বাংলাদেশ লিঃ</p>
      </div>
    </footer>
  )
}

export default Footer
