import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import image from "../../Logo/Logo.png";
import t from "../Data/Data"

export default function RegistrationPage() {
  const [lan, setLan] = useState("bn"); // 'bn' = Bangla, 'en' = English
  const [userType, setUserType] = useState("general"); // general | doctor | hospital | corporate
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  
  const handleSubmit = async (e) => {
    const response = await fetch(`http://localhost:8050/api/auth/signup`, {
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
    <div className="min-h-screen flex items-center justify-center bg-[#1a75a3] p-6 md:p-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-left mb-4">
          <img src={image} alt="Care Connect Health" className="h-10" />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-blue-700 mb-4">
          {t[lan].register}
        </h2>

        {/* lan Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setLan("bn")}
            className={`px-4 py-1 rounded-full ${
              lan === "bn"
                ? "bg-gray-300 text-black"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            বাংলা
          </button>
          <button
            onClick={() => setLan("en")}
            className={`px-4 py-1 rounded-full ${
              lan === "en"
                ? "bg-gray-300 text-black"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            English
          </button>
        </div>

        {/* User Type Buttons */}
        <div className="flex justify-between bg-blue-50 rounded-full p-1 text-sm mb-6">
          {["general", "doctor", "hospital", "corporate"].map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`flex-1 py-2 rounded-full transition delay-100 duration-300 ease-in-out  ${
                userType === type
                  ? "bg-white shadow text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              {t[lan][type]}
            </button>
          ))}
        </div>

        {/* Registration Form */}
        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              {t[lan].fullName}
            </label>
            <input
              type="text"
              placeholder={t[lan].fullName}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              {t[lan].phone}
            </label>
            <input
              type="text"
              placeholder={t[lan].phone}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              {t[lan].email}
            </label>
            <input
              type="email"
              placeholder={t[lan].email}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Conditional Fields */}
          {userType === "doctor" && (
            <>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[lan].regNo}
                </label>
                <input
                  type="text"
                  placeholder={t[lan].regNo}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[lan].specialty}
                </label>
                <input
                  type="text"
                  placeholder={t[lan].specialty}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          )}

          {userType === "hospital" && (
            <>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[lan].hospitalName}
                </label>
                <input
                  type="text"
                  placeholder={t[lan].hospitalName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[lan].hospitalReg}
                </label>
                <input
                  type="text"
                  placeholder={t[lan].hospitalReg}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          )}

          {userType === "corporate" && (
            <>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[lan].companyName}
                </label>
                <input
                  type="text"
                  placeholder={t[lan].companyName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[lan].companyId}
                </label>
                <input
                  type="text"
                  placeholder={t[lan].companyId}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          )}

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              {t[lan].password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t[lan].password}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              {t[lan].confirmPassword}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t[lan].confirmPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

       {/* Terms Checkbox */}
       <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="h-4 w-4"
            />
            <label className="text-gray-600">{t[lan].terms}</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!agreed} // ✅ Disabled until checked
            className={`w-full py-2 rounded-full font-semibold transition ${
              agreed
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t[lan].signUp}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm mt-6 text-gray-600">
          {t[lan].already}{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            {t[lan].login}
          </a>
        </div>
      </div>
    </div>
  );
}
