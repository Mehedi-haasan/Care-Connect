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