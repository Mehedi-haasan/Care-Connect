<<<<<<< HEAD
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputComponent from '../Input/InputComponent';
const Registration = () => {
  const [values, setValues] = useState({})
  const goToHome = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values)

    const response = await fetch(`http://localhost:8050/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const result = await response.json();
    alert(result.message)
  }



  return (
    <div className='flex justify-center items-center'>
      <div className='w-full md:w-[400px] py-10'>
        <form className="max-w-md">
          <InputComponent onChange={(value) => { setValues({ ...values, first_name: value }) }} label={"First Name"} type={"text"} placeholder={"First Name"} />
          <InputComponent onChange={(value) => { setValues({ ...values, last_name: value }) }} label={"Last Name"} type={"text"} placeholder={"Last Name"} />
          <InputComponent onChange={(value) => { setValues({ ...values, username: value }) }} label={"Mobile"} type={"number"} placeholder={"Enter your mobile"} />
          <InputComponent onChange={(value) => { setValues({ ...values, email: value }) }} label={"Email"} type={"email"} placeholder={"Enter your email"} />
          <InputComponent onChange={(value) => { setValues({ ...values, password: value }) }} label={"Password"} type={"password"} placeholder={"Enter your password"} />
          <button onClick={handleSubmit} className="text-white bg-blue-700 my-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
        <NavLink to={`/login`} className="text-black block mt-10 mx-auto hover:text-[#FF0000] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</NavLink>
      </div>
    </div>

  )
}

export default Registration
=======
import React, { useState } from "react";
import axios from "axios";
import image from "../../Logo/Logo.png";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://server.careconnect.com.bd/api/auth/signup",
        {
          ...formData,
          user_type_id: 1,
          dept_id: 1,
          address_id: 1,
          roles: [{ name: "user" }],
        }
      );

      alert(res.data.message || "Registration Successful ✅");

      // redirect to login
      window.location.href = "/login";

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Signup Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 flex items-center justify-center bg-[#1a75a3] min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-[90%] max-w-md">

        {/* Logo */}
        <div className="flex justify-start mb-4">
          <img src={image} alt="Care Connect Health" className="h-10" />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-blue-700 mb-6">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </h2>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            name="first_name"
            placeholder="নাম"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder="শেষ নাম"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            name="username"
            placeholder="ইউজারনেম"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="ইমেইল"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="পাসওয়ার্ড"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
          </button>

        </form>

        {/* Footer */}
        <div className="text-center text-sm mt-6 text-gray-600">
          <p>আপনার আগে থেকেই অ্যাকাউন্ট আছে?</p>
          <a href="/login" className="text-blue-600 hover:underline">
            সাইন ইন করুন
          </a>
        </div>

      </div>
    </div>
  );
}
>>>>>>> master
