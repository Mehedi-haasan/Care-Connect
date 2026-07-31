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


const getShortText = (html = "", limit = 60) => {
  const text = html.replace(/<[^>]*>/g, "");
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const Home = () => {



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
  const all = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=300&auto=format&fit=crop",
      title: "চর্মরোগ বিশেষজ্ঞ",
      author: "ডা. তমালিকা দেব",
      location: "নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ",
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=300&auto=format&fit=crop",
      title: "জনস্বাস্থ্য বিশেষজ্ঞ",
      author: "ডা. আরাফাত রহমান",
      location: "নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ",
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=300&auto=format&fit=crop",
      title: "কার্ডিওলজি",
      author: "ডা. সায়েদ শফিক",
      location: "নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ",
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=400&auto=format&fit=crop",
      title: "পুষ্টিবিদ",
      author: "শর্মিষ্ঠা ঘোষ",
      location: "নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ",
    },
    {
      id: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
      title: "সাইকিয়াট্রিস্ট",
      author: "ডা. মেহেদী হাসান",
      location: "নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ",
    },
  ];
  const [homeContents, setHomeContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [contentType, setContentType] = useState([])

  const FetchContents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/get/content`);
      const result = await res.json();
      setHomeContents(result?.items)
    } catch (err) {
      console.error("Failed to fetch content:", err);
    } finally {
      setLoading(false);
    }
  };


  const GetContentType = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/api/get/content/type/${1}/${10}`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json()
    setContentType(data.items)
  }

  useEffect(() => {
    GetContentType()
    FetchContents()
  }, []);


  return (
    <div className="bg-white min-h-screen">
      <Banner />





      {/* ================= CATEGORY NAV ================= */}
      <div className="bg-[#F9FFF2] py-5 px-3 md:px-10 lg:px-20">

        <div className="grid grid-cols-5 md:grid-cols-10 ">
          {contentType.map((content, i) => (
            <NavLink key={i} to={`/category/${content.id}`} className="text-center px-2 py-1.5 rounded-full hover:bg-[#8B61C2] hover:text-white  transition font-medium text-[10px] sm:text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis"  >
              {content.name}
            </NavLink>
          ))}

        </div>

      </div>

      {/* ================= HERO CONTENT ================= */}
      <Hero title="স্বাস্থ্য কথা" data={homeContents} />

      {/* ================= HEALTH PROTECTION ================= */}
      <div className="px-4 md:px-16 lg:px-32 mt-10">
        <div className="border-b pb-3 flex justify-between items-center">
          <h1 className="font-bold text-2xl text-[#6A1B9A]">
            স্বাস্থ্য সুরক্ষা
          </h1>

          {homeContents && (
            <h1 className="text-[#1976D2] text-[12px] sm:text-sm md:text-[13px] font-bold cursor-pointer" onClick={() => setShowAll(true)}>
              সমস্ত বিষয় পড়ুন
            </h1>
          )}
        </div>

        {loading ? (
          <p className="py-10 text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {homeContents.map((item) => (
              <Cart key={item.id} item={item} />
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
            <button key={i} className="rounded-lg px-3 py-2 font-semibold hover:bg-[#8B61C2] hover:text-white transition">
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* ================= EXTRA SECTIONS ================= */}
      <Recenthealth title="সাম্প্রতিক স্বাস্থ্য" data={homeContents} />
      <Advertisement className="bg-black text-[#ACA766] w-full my-10" />
      <AllDoctors data={all} />

      {/* ================= VIDEO SECTION ================= */}
      <HealthVideoSection homeContents={homeContents} />

    </div>
  );
};

export default Home;
