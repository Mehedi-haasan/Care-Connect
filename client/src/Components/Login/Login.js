// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';


// const Login = () => {
//   const [values, setValues] = useState({
//     username: "",
//     password: "",
//   });
//   const goTo = useNavigate()
//   const dispatch = useDispatch()
//   const handleSubmit = async (e) => {
//     const response = await fetch(`http://localhost:8050/api/auth/signin`, {
//       method: "POST",
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//       body: JSON.stringify(values),
//     });
//     const data = await response.json();
//     alert(data.message)
//     localStorage.setItem('token', data.accessToken);
//     // dispatch(IsLogin(true))
//     goTo('/')
//   }



//   return (
    
//   //   <div className='bg-white flex justify-center items-center min-h-screen'>

//   //     <div className='py-10 px-3 w-full md:w-[400px]'>
//   //     <div class="sm:mx-auto sm:w-full sm:max-w-sm">
//   //   <img src={image} alt="Your Company" class="mx-auto h-10 w-auto" />
//   //   <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
//   // </div>

//   //       <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  ">
//   //         <InputComponent onChange={(value) => { setValues({ ...values, username: value }) }} label={"Your email or phone number"} type={"text"} placeholder={"Enter your email or phone number"} />
//   //         <InputComponent onChange={(value) => { setValues({ ...values, password: value }) }} label={"Your password"} type={"password"} placeholder={"Password"} />

//   //         <div class="flex items-start mb-5">
//   //           <div class="flex items-center h-5">
//   //             <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
//   //           </div>
//   //           <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
//   //         </div>

//   //         <button onClick={handleSubmit} class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
//   //       </div>
//   //       <NavLink to={`/registration`} className="text-black block mt-10 mx-auto hover:text-[#FF0000] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</NavLink>

//   //     </div>
//   //   </div>





  



//   )
// }

// export default Login


import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import image from '../../Logo/Logo.png';
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a75a3]">
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
            <input
              type="text"
              placeholder="ইমেইল বা ফোন নাম্বার"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="পাসওয়ার্ড"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            সাইন ইন
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-3">
          <a href="#" className="text-sm text-gray-600 hover:underline">
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
          <a href="/registration" className="text-blue-600 hover:underline">
            আমি নতুন ব্যবহারকারী | সাইন আপ
          </a>
          
        </div>
      </div>
    </div>
  );
}

