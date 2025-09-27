import React, { useState, useEffect } from 'react'

const Footer = () => {


  return (
    <footer className='bg-[#002244] text-white p-5'>
      <div className='px-[205px]'>
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
    </footer>
  )
}

export default Footer
