// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';


// const ForgetPassword = () => {
//   const [login, setLogin] = useState(false);
//   const goToHome = useNavigate();
//   const [values, setValues] = useState({
//     email: "",
//   })

//   const [errorMessage, setErrorMessage] = useState("")


//   const handleSubmit = (e) => {

//   }
//   return (
//     <div className='bg-white'>
//       <div className='bg-white'>
//         <h1 className='py-5'>{ }</h1>


//         <div className='grid col-span-12 md:col-span-6 rounded-xl pr-5'>
//           {
//             login ? <div className='w-full md:w-[40%] mx-auto'>
//               <h1 className='text-center text-xl font-semibold py-6 '>Recover your password</h1>

//               <div className='mt-5 mx-auto w-[95%]'>
//                 <label className='text-xl font-semibold pt-4'>Enter your OTP</label>
//                 <input type='text' placeholder='Enter your OTP' className='border-b py-1 w-full focus:outline-none' />
//               </div>

//               <div className='mt-5 mx-auto w-[95%]'>
//                 <label className='mt-2 text-xl font-semibold pt-4'>New password</label>
//                 <input type='text' placeholder='Enter your new password' className='border-b py-1 w-full focus:outline-none' />
//               </div>

//               <div className='mt-5 mx-auto w-[95%]'>
//                 <label className='text-xl font-semibold pt-4'>Confirm Password</label>
//                 <input type='text' placeholder='Enter your confirm password' className='border-b py-1 w-full focus:outline-none' />
//               </div>


//               <div className='flex my-6 mx-auto w-[95%]'>
//                 <button onClick={() => { goToHome("/") }} className='border block font-semibold bg-[#1B80E0] text-white mx-auto px-6 h-10 rounded-xl w-full'>Submit</button>
//               </div>
//             </div> : <div className='w-full md:w-[40%] mx-auto'>
//               <h1 className='text-center text-xl font-semibold py-6 '>Forget Password</h1>


//               <h1 className='text-center p-2'>Lost your password? Please enter your username or email address.<br /> You will receive a link to create a new password via email.</h1>
//               <div className='mt-5 mx-auto w-[95%]'>
//                 <label className='mt-2 text-xl font-semibold pt-4'>E-mail Address</label>
//                 <input type='text' placeholder='Enter your email' onChange={(e) => { setValues({ ...values, email: e.target.value }) }} className='border-2 p-1 w-full rounded focus:outline-none' />
//               </div>


//               <div className='flex my-6 mx-auto w-[95%]'>
//                 <button onClick={handleSubmit} className='border block font-semibold bg-[#1B80E0] w-full text-white mx-auto px-8 h-10 rounded-xl'>Send OTP</button>
//               </div>

//             </div>
//           }

//         </div>
//       </div>
//       <h1 className='py-5'>{ }</h1>
//     </div>

//   )
// }

// export default ForgetPassword








import React, { useState } from "react";
import image from "../../Logo/Logo.png";

export default function ForgetPassword() {
  const [language, setLanguage] = useState("bn");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const t = {
    bn: {
      title: "পাসওয়ার্ড ভুলে গেছেন?",
      subtitle:
        "আপনার নিবন্ধিত ইমেইল বা ফোন নাম্বার দিন, আমরা আপনাকে একটি পাসওয়ার্ড রিসেট লিংক পাঠাব।",
      email: "ইমেইল / ফোন নাম্বার",
      submit: "রিসেট লিংক পাঠান",
      back: "লগইন পেজে ফিরে যান",
      sent: "রিসেট লিংক পাঠানো হয়েছে!",
    },
    en: {
      title: "Forgot Password?",
      subtitle:
        "Enter your registered email or phone number and we’ll send you a password reset link.",
      email: "Email / Phone Number",
      submit: "Send Reset Link",
      back: "Back to Login Page",
      sent: "Reset link sent successfully!",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setSubmitted(true);

    // 🔹 Later: integrate with backend API (e.g., axios.post("/api/forgot-password", { email }))
  };

  return (
    <div className=" flex items-center justify-center bg-[#1a75a3] p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-[90%] max-w-md">
        {/* Logo */}
        <div className="flex justify-left mb-4">
          <img src={image} alt="Care Connect Health" className="h-10" />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-blue-700 mb-2">
          {t[language].title}
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          {t[language].subtitle}
        </p>

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

        {/* Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t[language].email}
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t[language].email}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={!email.trim()}
              className={`w-full py-2 rounded-full font-semibold transition ${
                email.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {t[language].submit}
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-medium mb-6">
            ✅ {t[language].sent}
          </div>
        )}

        {/* Back to Login */}
        <div className="text-center text-sm mt-6">
          <a href="/login" className="text-blue-600 hover:underline">
            {t[language].back}
          </a>
        </div>
      </div>
    </div>
  );
}
