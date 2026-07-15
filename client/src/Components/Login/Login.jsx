import React, { useState } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import image from '../../Logo/Logo.png';



export default function LoginPage() {

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  
  const handleSubmit = async (e) => {
    const response = await fetch(`http://localhost:8050/api/auth/signin`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    localStorage.setItem('token', data.accessToken);
    goTo('/')
  }

  return (
    <div className="py-8 flex items-center justify-center bg-[#1a75a3]">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-[90%] max-w-md">
        {/* Logo */}
        <div className="flex justify-left mb-4">
          <img src={image} alt="Care Connect Health" className="h-10" />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-blue-700 mb-6">
          আপনাকে স্বাগতম
        </h2>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <input onChange={(e) => { setValues({ ...values, username: e.target.value }) }}
              type="text"
              placeholder="ইমেইল বা ফোন নাম্বার"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input onChange={(e) => { setValues({ ...values, username: e.target.value }) }}
              type="password"
              placeholder="পাসওয়ার্ড"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            সাইন ইন
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-3">
          <a href="/ForgetPassword" className="text-sm text-gray-600 hover:underline">
            পাসওয়ার্ড মনে নেই?
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-sm text-gray-500">অথবা</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition">
            <FaFacebookF className="text-blue-600" />
            Facebook
          </button>
          <a href="#" > <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition">
            <FcGoogle />
            Google
          </button></a>
        </div>

        {/* Footer */}
        <div className="text-center text-sm mt-6 text-gray-600">
          <p className="mb-2">ব্যবহারের শর্তাবলী</p>
          <a href="/registration" className="text-blue-600 hover:underline">
            আমি নতুন ব্যবহারকারী | সাইন আপ
          </a>

        </div>
      </div>
    </div>
  );
}

