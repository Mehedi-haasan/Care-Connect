import React, { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../Logo/userProfile.png";

export default function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🔐 Already logged in → go dashboard */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  /* ================= LOGIN FUNCTION ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://server.careconnect.com.bd/api/auth/signin",
        {
          username: username,
          password: password,
        }
      );

      // ✅ Save token
      localStorage.setItem("token", res.data.accessToken);

      alert("Login Successful ✅");

      // ✅ Redirect
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Login Failed ❌");
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
          আপনাকে স্বাগতম
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="text"
            placeholder="ইমেইল বা ইউজারনেম"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="পাসওয়ার্ড"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "লোড হচ্ছে..." : "লগইন"}
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

          <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition">
            <FcGoogle />
            Google
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm mt-6 text-gray-600">
          <p className="mb-2">ব্যবহারের শর্তাবলী</p>
          <button
            onClick={() => navigate("/registration")}
            className="text-blue-600 hover:underline"
          >
            আমি নতুন ব্যবহারকারী | সাইন আপ
          </button>
        </div>

      </div>
    </div>
  );
}