import { useState } from "react";
import { NavLink } from "react-router-dom";
import videoDemo from "../../assets/video/video.mp4"; // Default main video
import Advertisement from "../Common/Advertisement";
import Cart from "../Common/Cart";
import AllDoctors from "./AllDoctors";
import Hero from "./Hero";
import Recenthealth from "./RecentHealth";

const Home = () => {
  // ===== CATEGORY DATA =====
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

  // ===== DEMO CARD DATA =====
  const data = [
    {
      id: 1,
      categoryKey: "maternal_health",
      title: "গর্ভাবস্থায় করণীয়",
      author: "ডা. সামান্তা রহমান",
      imageUrl:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      categoryKey: "maternal_health",
      title: "গর্ভকালীন পুষ্টি তালিকা",
      author: "পুষ্টিবিদ",
      imageUrl:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 3,
      categoryKey: "child_care",
      title: "নবজাতকের যত্ন নেওয়ার নিয়ম",
      author: "ডা. রাশেদ",
      imageUrl:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 3,
      categoryKey: "child_care",
      title: "নবজাতকের যত্ন নেওয়ার নিয়ম",
      author: "ডা. রাশেদ",
      imageUrl:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  // ===== VIDEO PLAYER STATE =====
  const [currentVideo, setCurrentVideo] = useState(videoDemo);

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <div className="bg-[#D9D9D9]">
        <div className="pr-56 grid grid-cols-5">
          <div className="bg-[#AFD7E2]"></div>
          <div className="font-extrabold col-span-4 py-14 text-right">
            <h1 className="py-1 text-xl md:text-2xl lg:text-4xl xl:text-5xl text-[#8B61C2]">বাংলা ভাষায়</h1>
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl text-[#0170C0]">সহজবোধ্য  স্বাস্থ্যকথা</h1>
            <h1 className="pt-8 text-xl md:text-2xl lg:text-4xl text-[#102F76]">ডিজিটাল স্বাস্থ্যসেবা</h1>
          </div>
        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <div className="flex justify-between items-center bg-[#F9FFF2] py-8 px-4 md:px-16 lg:px-32 overflow-x-auto hide-scrollbar gap-4">
        {categories.map((item) => (
          <NavLink
            key={item.key}
            to={`/category/${item.key}`}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-[#8B61C2] hover:text-white transition font-semibold whitespace-nowrap"
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* HERO COMPONENT */}
      <Hero title="স্বাস্থ্য কথা" />

      {/* HEALTH CARDS */}
      <div className="flex justify-start items-start px-4 md:px-16 lg:px-32 gap-8 mt-10">
        <div className="w-full">
          <div className="border-b flex justify-between items-center pb-3">
            <h1 className="font-bold text-xl text-[#6A1B9A]">স্বাস্থ্য সুরক্ষা</h1>
            <h1 className="text-[#1976D2] font-semibold text-[15px] cursor-pointer">সমস্ত বিষয় পড়ুন</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-8 pt-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => setCurrentVideo(item.videoUrl)}
              >
                <Cart item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DISEASE TYPES */}
      <div className="w-full pt-10 px-4 md:px-16 lg:px-32">
        <div className="border-b flex justify-between items-center pb-3">
          <h1 className="font-extrabold text-xl">রোগের ধরনসমূহ</h1>
          <h1 className="text-[#1976D2] font-semibold text-[12px] cursor-pointer">সমস্ত বিষয় পড়ুন</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 py-4 bg-[#F2EEF8] mt-4">
          {diseases.map((item, i) => (
            <button key={i} className="mt-2 rounded-lg px-3 py-1 font-semibold hover:bg-[#8B61C2] hover:text-white transition">{item}</button>
          ))}
        </div>
      </div>

      {/* RECENT HEALTH */}
      <Recenthealth title="সাম্প্রতিক স্বাস্থ্য" />
      <Advertisement className="bg-black text-[#ACA766] w-full my-8" />
      <AllDoctors />

      {/* VIDEO SECTION */}
      <div className="w-full pt-10 pb-5 px-4 md:px-16 lg:px-32 bg-[#F4F9FD]">
        <div className="border-b flex justify-between items-center pb-2">
          <h1 className="font-bold text-xl">স্বাস্থ্য ভিডিও</h1>
          <h1 className="text-[#1976D2] font-semibold text-[12px] cursor-pointer">সমস্ত ভিডিও দেখুন</h1>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-5 pt-6">
          {/* Main Video */}
          <div className="lg:col-span-3">
            <video
              src={currentVideo}
              className="w-full max-h-[500px] rounded"
              controls
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Video List */}
          <div className="lg:col-span-2 flex flex-col gap-4 pt-2">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setCurrentVideo(item.videoUrl)}
              >
                <div className="pl-2">
                  <h1 className="px-1 py-1 text-sm font-bold">{item.title}</h1>
                </div>
                <div className="w-[100px]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-[80px] w-full object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
