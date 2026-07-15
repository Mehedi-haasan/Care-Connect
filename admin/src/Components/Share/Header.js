<<<<<<< HEAD
import { NavLink, useNavigate, } from "react-router-dom";
import { useState } from "react";
import logo from "../Logo/Mahlun.PNG"
import Notification from "../../icons/Notification";
import MessageBar from "./MessageBar";


const Header = ({ auth }) => {
  function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
}

  return (
    <div className="sticky top-0 z-50 shadow">

      <div className="flex justify-between items-center sticky top-0 z-50 w-[98%] mx-auto bg-white py-1">

        <div className="">
          <NavLink className={`font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#FB923C] py-2`} to="/">Care Connect</NavLink>
        </div>


        <div className="flex justify-end items-center gap-3">
          {auth ? <NavLink to='/profile' className='font-bold text-sm xl:text-md mr-2'>My Account</NavLink> : <NavLink to={`/`} className='font-semibold text-sm lg:text-md'>LOGIN</NavLink>}
          <NavLink to='/notification' className="relative hover:bg-slate-200 p-2 rounded-full">
            <Notification />
            <h1 className="text-red-600 absolute top-0 right-[2px] font-semibold text-sm">{generateRandomNumber()}</h1>
          </NavLink>
        </div>
      </div>

      <MessageBar userId={1} />
    </div >
  )
};

export default Header;

=======
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../Logo/Mahlun.PNG";
import Notification from "../../icons/Notification";
import MessageBar from "./MessageBar";

const Header = ({ auth }) => {
  // Random notification count (replace with real data later)
  const generateRandomNumber = () => Math.floor(Math.random() * 20) + 1;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow bg-white">
      {/* Top Navbar */}
      <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto px-4 py-2 md:py-3">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#FB923C]"
        >
          Care Connect
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {auth ? (
            <NavLink
              to="/profile"
              className="font-bold text-sm lg:text-md hover:text-orange-500"
            >
              My Account
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className="font-semibold text-sm lg:text-md hover:text-orange-500"
            >
              LOGIN
            </NavLink>
          )}

          <NavLink
            to="/notification"
            className="relative hover:bg-slate-200 p-2 rounded-full transition"
          >
            <Notification />
            <span className="absolute top-0 right-0 -translate-x-1/4 -translate-y-1/4 bg-red-600 text-white rounded-full text-xs font-semibold w-5 h-5 flex items-center justify-center">
              {generateRandomNumber()}
            </span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-slate-200 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md w-full px-4 pb-2 flex flex-col gap-2">
          {auth ? (
            <NavLink
              to="/profile"
              className="font-bold text-sm hover:text-orange-500"
            >
              My Account
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className="font-semibold text-sm hover:text-orange-500"
            >
              LOGIN
            </NavLink>
          )}
          <NavLink
            to="/notification"
            className="relative hover:bg-slate-200 p-2 rounded-full transition"
          >
            <Notification />
            <span className="absolute top-0 right-0 -translate-x-1/4 -translate-y-1/4 bg-red-600 text-white rounded-full text-xs font-semibold w-5 h-5 flex items-center justify-center">
              {generateRandomNumber()}
            </span>
          </NavLink>
        </div>
      )}

      {/* Message Bar */}
      <div className="mt-1">
        <MessageBar userId={1} />
      </div>
    </header>
  );
};

export default Header;
>>>>>>> master
