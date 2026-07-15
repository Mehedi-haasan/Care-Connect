import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import image from "../../Logo/Logo.png";

export default function RegistrationPage() {
  const [language, setLanguage] = useState("bn"); // 'bn' = Bangla, 'en' = English
  const [userType, setUserType] = useState("general"); // general | doctor | hospital | corporate
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Text dictionary
  const t = {
    bn: {
      register: "রেজিস্ট্রেশন করুন",
      general: "সাধারণ ব্যবহারকারী",
      doctor: "ডাক্তার",
      hospital: "হাসপাতাল/ক্লিনিক",
      corporate: "কর্পোরেট",
      fullName: "আপনার পূর্ণ নাম",
      phone: "ফোন নাম্বার",
      email: "ইমেইল (ঐচ্ছিক)",
      password: "পাসওয়ার্ড",
      confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
      terms: "ব্যবহারের শর্তাবলী ও গোপনীয়তার নীতিমালা আমি সম্মতি জানাই।",
      signUp: "সাইন আপ",
      already: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
      login: "লগইন করুন",
      regNo: "রেজিস্ট্রেশন নম্বর",
      specialty: "বিশেষজ্ঞতার নাম",
      hospitalName: "হাসপাতালের নাম",
      hospitalReg: "হাসপাতাল রেজিস্ট্রেশন নম্বর",
      companyName: "প্রতিষ্ঠানের নাম",
      companyId: "প্রতিষ্ঠানের আইডি/কোড",
    },
    en: {
      register: "Register Now",
      general: "General User",
      doctor: "Doctor",
      hospital: "Hospital/Clinic",
      corporate: "Corporate",
      fullName: "Full Name",
      phone: "Phone Number",
      email: "Email (Optional)",
      password: "Password",
      confirmPassword: "Confirm Password",
      terms: "I agree to the Terms of Use & Privacy Policy.",
      signUp: "Sign Up",
      already: "Already have an account?",
      login: "Login",
      regNo: "Registration Number",
      specialty: "Specialty",
      hospitalName: "Hospital Name",
      hospitalReg: "Hospital Registration No.",
      companyName: "Company Name",
      companyId: "Company ID/Code",
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a75a3] p-6 md:p-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-left mb-4">
          <img src={image} alt="Care Connect Health" className="h-10" />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-blue-700 mb-4">
          {t[language].register}
        </h2>

        {/* Language Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setLanguage("bn")}
            className={`px-4 py-1 rounded-full ${
              language === "bn"
                ? "bg-gray-300 text-black"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            বাংলা
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-4 py-1 rounded-full ${
              language === "en"
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
              {t[language][type]}
            </button>
          ))}
        </div>

        {/* Registration Form */}
        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              {t[language].fullName}
            </label>
            <input
              type="text"
              placeholder={t[language].fullName}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              {t[language].phone}
            </label>
            <input
              type="text"
              placeholder={t[language].phone}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              {t[language].email}
            </label>
            <input
              type="email"
              placeholder={t[language].email}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Conditional Fields */}
          {userType === "doctor" && (
            <>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[language].regNo}
                </label>
                <input
                  type="text"
                  placeholder={t[language].regNo}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[language].specialty}
                </label>
                <input
                  type="text"
                  placeholder={t[language].specialty}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          )}

          {userType === "hospital" && (
            <>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[language].hospitalName}
                </label>
                <input
                  type="text"
                  placeholder={t[language].hospitalName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[language].hospitalReg}
                </label>
                <input
                  type="text"
                  placeholder={t[language].hospitalReg}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          )}

          {userType === "corporate" && (
            <>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[language].companyName}
                </label>
                <input
                  type="text"
                  placeholder={t[language].companyName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  {t[language].companyId}
                </label>
                <input
                  type="text"
                  placeholder={t[language].companyId}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          )}

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              {t[language].password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t[language].password}
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
              {t[language].confirmPassword}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t[language].confirmPassword}
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
            <label className="text-gray-600">{t[language].terms}</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!agreed} // ✅ Disabled until checked
            className={`w-full py-2 rounded-full font-semibold transition ${
              agreed
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t[language].signUp}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm mt-6 text-gray-600">
          {t[language].already}{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            {t[language].login}
          </a>
        </div>
      </div>
    </div>
  );
}
