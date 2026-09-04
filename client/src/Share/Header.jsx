import { useState } from "react";
import { NavLink } from "react-router-dom";
import image from "../Logo/Logo.png";
import profile_logo from "../Logo/userProfile.png"

const Header = () => {
  const [focus, setFocus] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useState(true)
  const [isShowProfile, setIsShowProfile] = useState(false);
  const menuItems = [
    { title: "স্বাস্থ্য পাঠ", link: "/" },
    { title: "বিষয়-ভিত্তিক", link: "#" },
    { title: "ডাক্তার", link: "/doctors" },
    { title: "হাসপাতাল", link: "/hospitals" },
    { title: "সেবা সমূহ", link: "#" },
  ];
  const info = {}

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-2 md:py-3">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={image} alt="Logo" className="h-10 md:h-12 w-auto" />
          <span className="hidden md:inline text-xs md:text-sm font-semibold text-[#006aff]">
            স্বাস্থ্য | তথ্য | সহায়ক | সেবা
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4 md:gap-6 text-sm">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.link}
              className="text-[#8B61C2] hover:text-[#006aff] transition font-medium text-xs md:text-sm"
            >
              {item.title}
            </NavLink>
          ))}

          {/* Modern Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className={`border rounded-full pl-8 pr-3 py-1 md:py-2 text-xs md:text-sm transition w-28 md:w-40 focus:ring-2 focus:ring-[#8B61C2] focus:outline-none`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute top-1/2 transform -translate-y-1/2 left-2 text-[#A2775A] w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${focus ? "text-[#8B61C2]" : "text-[#A2775A]"
                }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="m16.622 15.172 4.244 4.244-1.414 1.415-4.24-4.24a7 7 0 1 1 1.41-1.42zM16 11a5 5 0 1 0-10 0 5 5 0 0 0 10 0"
              />
            </svg>
            <button className="absolute top-1/2 -translate-y-1/2 right-0 bg-[#8B61C2] hover:bg-[#006aff] text-white rounded-full py-1 md:py-2 px-3 md:px-4 text-xs md:text-sm font-medium transition">
              Search
            </button>
          </div>



          {auth ? <div className="flex justify-start items-start gap-2 cursor-pointer relative">
            <button className='font-bold text-sm xl:text-md cursor-pointer' onClick={() => setIsShowProfile(!isShowProfile)}>
              <img src={info?.image ? info.image : profile_logo}
                onError={(e) => {
                  e.currentTarget.src = profile_logo;
                }}
                alt="profile" className="h-10 w-10 rounded-full cursor-pointer" />
            </button>
            <div onClick={() => setIsShowProfile(!isShowProfile)} className="hidden md:block dark:text-white">
              <h1 className="text-sm font-semibold pt-1">{info?.name}</h1>
              <p className="text-xs">{info?.role}</p>
            </div>
            <div className={`absolute ${isShowProfile ? '' : 'hidden'} bg-[#FFFFFF] shadow h-20 w-32 top-[52px] rounded-lg`}>
              <div className="">
                <NavLink to={`/profile`} onClick={() => setIsShowProfile(!isShowProfile)} className="flex justify-start items-center gap-2 border-b p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
                  <h1>Profile</h1>
                </NavLink>
                <button className="flex justify-start items-center gap-2 ml-1 p-2" onClick={() => { setIsShowProfile(!isShowProfile); localStorage.setItem('token', ''); isLoggedOut(false); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 11h8v2H5v3l-5-4l5-4zm-1 7h2.708a8 8 0 1 0 0-12H4a9.99 9.99 0 0 1 8-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.99 9.99 0 0 1-8-4" /></svg>
                  <h1> Log out</h1>
                </button>
              </div>
            </div>
          </div> : <NavLink to={"/login"} className="text-[#8B61C2] hover:text-[#006aff] transition font-medium text-xs md:text-sm">লগইন</NavLink>}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#8B61C2] focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-3 space-y-2 text-sm">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.link}
              className="block py-1 text-[#8B61C2] hover:text-[#006aff] font-medium text-xs"
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </NavLink>
          ))}

          {/* Mobile Modern Search */}
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-full pl-8 pr-3 py-1 text-xs focus:ring-2 focus:ring-[#8B61C2] focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#A2775A] w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="m16.622 15.172 4.244 4.244-1.414 1.415-4.24-4.24a7 7 0 1 1 1.41-1.42zM16 11a5 5 0 1 0-10 0 5 5 0 0 0 10 0"
              />
            </svg>
            <button className="absolute top-1/2 -translate-y-1/2 right-0 bg-[#8B61C2] hover:bg-[#006aff] text-white rounded-full py-1 px-3 text-xs font-medium transition">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
