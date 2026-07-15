import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useRef, useEffect } from "react";

const Banner = () => {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const [data] = useState([
    { id: 1, imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200" },
    { id: 2, imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200" },
    { id: 3, imageUrl: "https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=1200" },
  ]);



  const settings = {
    infinite: true,
    autoplaySpeed: 8000,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  // ✅ Outside click close (fixed)
  useEffect(() => {
    const handleClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSearch]);

  return (
    <div className="bg-#FFF7FC">

      {/* HERO */}
      <div className="relative">

        {/* SLIDER */}
        <Slider {...settings}>
          {data.map((item) => (
            <div key={item.id}>
              <img
                src={item.imageUrl}
                alt=""
                className="w-full h-[250px] md:h-[320px] object-cover"
              />
            </div>
          ))}
        </Slider>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30">

          {/* TEXT */}
          <div className="flex items-center h-full">
            <div className="pl-6 md:pl-12 font-extrabold text-left">
              <h1 className="text-xl md:text-4xl text-[#8B61C2]">
                বাংলা ভাষায়
              </h1>
              <h1 className="text-xl md:text-4xl text-[#0170C0]">
                সহজবোধ্য স্বাস্থ্যকথা
              </h1>
              <h1 className="pt-4 text-lg md:text-3xl text-[#102F76]">
                ডিজিটাল স্বাস্থ্যসেবা
              </h1>
            </div>
          </div>

          {/* BUTTON */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
            <button
              ref={buttonRef}
              onClick={() => setShowSearch((prev) => !prev)}
              className="px-6 md:px-10 py-2 md:py-3 rounded-full text-sm md:text-lg font-semibold 
                         text-[#0a3d91] 
                         bg-gradient-to-r from-[#cfd9ff] via-[#e0c3fc] to-[#fbc2eb] 
                         shadow-xl hover:scale-105 transition"
            >
              অ্যাপয়েন্টমেন্ট
            </button>
          </div>

        </div>
      </div>

      {/* SPACE */}
      <div className="h-20"></div>

      {/* ===== SMOOTH PANEL ===== */}
      <div
        ref={panelRef}
        className={`px-3 md:px-0 transition-all duration-500 ease-in-out overflow-hidden ${
          showSearch
            ? "opacity-100 translate-y-0 max-h-[600px]"
            : "opacity-0 -translate-y-6 max-h-0"
        }`}
      >
        <div className=" flex justify-center">
          <div className="w-full md:w-[95%] bg-[#EDEDED] p-5 md:p-6 shadow-lg">

            {/* ===== SEARCH BAR ===== */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">

              <div className="flex items-center flex-1 bg-white border rounded-full px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-300">
                <input
                  type="text"
                  placeholder="ডাক্তার/ হাসপাতাল/ ডায়াগনস্টিক খুঁজুন..."
                  className="flex-1 bg-transparent outline-none text-sm md:text-base"
                />
                <span className="text-gray-400 ml-2">🔍</span>
              </div>

              <button
                onClick={() => navigate("/search")}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition"
              >
                সার্চ করুন
              </button>

            </div>

            {/* ===== FILTER ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

              {[
                "ডাক্তার",
                "চিকিৎসা কেন্দ্র",
                "বাংলাদেশ",
                "বিভাগ",
                "জেলা",
                "উপজেলা",
                "পুরুষ",
              ].map((item, i) => (
                <select
                  key={i}
                  className="border rounded-lg px-3 py-2 text-sm bg-white w-full"
                >
                  <option>{item}</option>
                </select>
              ))}

              <button
                onClick={() => navigate("/search")}
                className="col-span-2 sm:col-span-1 bg-gradient-to-r from-[#cfd9ff] via-[#e0c3fc] to-[#fbc2eb] 
                           rounded-lg py-2 text-sm font-semibold"
              >
                সার্চ করুন
              </button>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Banner;