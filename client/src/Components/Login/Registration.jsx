import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import image from "../../Logo/Logo.png";
import InputComponent from "../Input/InputComponent";
import BASE_URL from "../URL/baseurl";
import t from '../Data/Data'

export default function RegistrationPage() {
  const [lang, setLang] = useState("bn");
  const [userType, setUserType] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [values, setValues] = useState({
    roles: ['user']
  })
  const [message, setMessage] = useState({ id: Date.now(), mgs: '' });


  const handleSubmit = async () => {
    console.log(values)
    try {

      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setMessage({ ...message, id: Date.now(), mgs: data?.message })
    } catch (error) {
      setMessage({ ...message, id: Date.now(), mgs: error?.message })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a75a3] p-6 md:p-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 w-full max-w-4xl">
        {/* Logo */}
        <div className="flex justify-left mb-4">
          <img src={image} alt="Care Connect Health" className="h-10" />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-blue-700 mb-4">{t[lang].register}</h2>

        {/* lang Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button onClick={() => setLang("bn")} className={`px-4 py-1 rounded-full ${lang === "bn" ? "bg-gray-300 text-black" : "bg-gray-100 text-gray-500"}`}>
            বাংলা
          </button>
          <button onClick={() => setLang("en")} className={`px-4 py-1 rounded-full ${lang === "en" ? "bg-gray-300 text-black" : "bg-gray-100 text-gray-500"}`}>
            English
          </button>
        </div>

        {/* User Type Buttons */}
        <div className="flex justify-between bg-blue-50 rounded-full p-1 text-sm mb-6">
          {["general", "doctor", "hospital", "corporate"].map((type) => (
            <button key={type} onClick={() => { setUserType(type); setValues({ ...values, user_type: type }) }} className={`flex-1 py-2 rounded-full transition delay-100 duration-300 ease-in-out  ${userType === type
              ? "bg-white shadow text-blue-600 font-medium" : "text-gray-600"}`}>
              {t[lang][type]}
            </button>
          ))}
        </div>

        {/* Registration Form */}
        <div className="space-y-4">
          <InputComponent type={"text"} label={t[lang].fullName} onChange={(v) => setValues({ ...values, name: v })} placeholder={t[lang].fullName} />
          <InputComponent type={"text"} label={t[lang].phone} onChange={(v) => setValues({ ...values, phone: v, username: v })} placeholder={t[lang].phone} />
          <InputComponent type={"email"} label={t[lang].email} onChange={(v) => setValues({ ...values, email: v })} placeholder={t[lang].email} />

          {/* Conditional Fields */}
          {userType === "doctor" && (<>
            <InputComponent type={"text"} label={t[lang].regNo} onChange={(v) => setValues({ ...values, reg_number: v })} placeholder={t[lang].regNo} />
            <InputComponent type={"text"} label={t[lang].specialty} onChange={(v) => setValues({ ...values, designation: v })} placeholder={t[lang].specialty} />
            <InputComponent type={"text"} label={t[lang].specialty} onChange={(v) => setValues({ ...values, experience: v })} placeholder={t[lang].specialty} />
          </>)}

          {userType === "hospital" && (<>
            {/* <InputComponent type={"text"} label={t[lang].hospitalName} onChange={(v) => setValues({ ...values, name: v })} placeholder={t[lang].hospitalName} /> */}
            <InputComponent type={"text"} label={t[lang].hospitalReg} onChange={(v) => setValues({ ...values, reg_number: v })} placeholder={t[lang].hospitalReg} />
          </>)}

          {userType === "corporate" && (<>
            <InputComponent type={"text"} label={t[lang].companyName} onChange={(v) => setValues({ ...values, name: v })} placeholder={t[lang].companyName} />
            <InputComponent type={"text"} label={t[lang].companyId} onChange={(v) => setValues({ ...values, name: v })} placeholder={t[lang].companyId} />
          </>)}

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">{t[lang].password}</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} onChange={(e) => setValues({ ...values, password: e.target.value })}
                placeholder={t[lang].password} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="h-4 w-4" />
            <label className="text-gray-600">{t[lang].terms}</label>
          </div>

          {/* Submit Button */}
          <button onClick={handleSubmit} disabled={!agreed} className={`w-full py-2 rounded-full font-semibold transition ${agreed ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}          >
            {t[lang].signUp}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm mt-6 text-gray-600">{t[lang].already}{" "}<a href="/login" className="text-blue-600 hover:underline">{t[lang].login}</a></div>
      </div>
    </div>
  );
}
