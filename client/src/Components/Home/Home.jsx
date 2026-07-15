import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BASE_URL from "../URL/baseurl";

import Advertisement from "../Common/Advertisement";
import Cart from "../Common/Cart";
import AllDoctors from "./AllDoctors";
import Hero from "./Hero";
import Banner from "./Banner";
import Recenthealth from "./RecentHealth";
import HealthVideoSection from "./HealthVideoSection";

/* ===============================
   UTILS
================================ */
// Strip HTML & truncate text
const getShortText = (html = "", limit = 60) => {
  const text = html.replace(/<[^>]*>/g, "");
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const Home = () => {
  /* ===============================
     STATIC DATA
  ================================ */
  const categories = [
    { key: "maternal_health", label: "মাতৃ স্বাস্থ্য" },
    { key: "child_care", label: "শিশু যত্ন" },
    { key: "family_planning", label: "পরিবার পরিকল্পনা" },
    { key: "adolescent_health", label: "কৈশোর স্বাস্থ্য" },
    { key: "mental_health", label: "মানসিক স্বাস্থ্য" },
    { key: "elderly_health", label: "প্রবীণ স্বাস্থ্য" },
    { key: "general_health", label: "সাধারণ স্বাস্থ্য" },
    { key: "women_health", label: "নারী স্বাস্থ্য" },
    { key: "nutrition", label: "খাদ্য ও পুষ্টি" },
    { key: "fitness", label: "ফিটনেস" },
  ];

  const diseases = [
    "অ্যালার্জি",
    "গ্যাস্ট্রিক",
    "অ্যাজমা",
    "মাইগ্রেন",
    "হাইপারটেনশন",
    "ডিপ্রেশন",
    "ত্বকের ফাঙ্গাস",
    "ডায়াবেটিস",
    "জন্ডিস",
    "সর্দি-কাশি",
  ];

  /* ===============================
     STATE
  ================================ */
  const [homeContents, setHomeContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  /* ===============================
     FETCH HOME CONTENT
  ================================ */
  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/content-section`);
        const result = await res.json();

        const items = (result.items || [])
          .filter(
            (item) =>
              item.section_name === "health_protection" &&
              item.active === true
          )
          .sort((a, b) => a.sequence - b.sequence);

        setHomeContents(items);
      } catch (error) {
        console.error("Home content fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  // Show only first 4 items initially
  const displayedContents = showAll
    ? homeContents
    : homeContents.slice(0, 4);

  /* ===============================
     UI
  ================================ */
  return (
    <div className="bg-white min-h-screen">
       <Banner />
      




      {/* ================= CATEGORY NAV ================= */}
<div className="bg-[#F9FFF2] py-5 px-3 md:px-10 lg:px-20">

  <div className="grid grid-cols-5 md:grid-cols-10 ">

    {categories.map((cat) => (
      <NavLink
        key={cat.key}
        to={`/category/${cat.key}`}
        className="text-center px-2 py-1.5 rounded-full 
                    hover:bg-[#8B61C2] hover:text-white 
                   transition font-medium
                   text-[10px] sm:text-xs md:text-sm
                   whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {cat.label}
      </NavLink>
    ))}

  </div>

</div>

      {/* ================= HERO CONTENT ================= */}
      <Hero title="স্বাস্থ্য কথা" />

      {/* ================= HEALTH PROTECTION ================= */}
      <div className="px-4 md:px-16 lg:px-32 mt-10">
        <div className="border-b pb-3 flex justify-between items-center">
          <h1 className="font-bold text-2xl text-[#6A1B9A]">
            স্বাস্থ্য সুরক্ষা
          </h1>

          {!showAll && homeContents.length > 4 && (
            <h1
              className="text-[#1976D2] text-[12px] sm:text-sm md:text-[13px] font-bold cursor-pointer"
              onClick={() => setShowAll(true)}
            >
              সমস্ত বিষয় পড়ুন
            </h1>
          )}
        </div>

        {loading ? (
          <p className="py-10 text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {displayedContents.map((item) => (
              <Cart
                key={item.id}
                item={{
                  id: item.id,
                  title: item.title,
                  name: item.name || item.author || "ডাক্তার",
                  category_type: item.category_type,
                  image_url: item.image_url,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= DISEASE TYPES ================= */}
      <div className="pt-12 px-4 md:px-16 lg:px-32">
        <div className="border-b pb-3">
          <h1 className="font-extrabold text-xl">রোগের ধরনসমূহ</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 py-4 bg-[#F2EEF8] mt-4 rounded-xl">
          {diseases.map((d, i) => (
            <button
              key={i}
              className="rounded-lg px-3 py-2 font-semibold hover:bg-[#8B61C2] hover:text-white transition"
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* ================= EXTRA SECTIONS ================= */}
      <Recenthealth title="সাম্প্রতিক স্বাস্থ্য" />
      <Advertisement className="bg-black text-[#ACA766] w-full my-10" />
      <AllDoctors />

      {/* ================= VIDEO SECTION ================= */}
      <HealthVideoSection homeContents={homeContents} />

    </div>
  );
};

export default Home;
