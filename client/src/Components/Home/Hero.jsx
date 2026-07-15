<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ title }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false); // state to control showing all items

  const data = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      category: "ড. আবুল খায়ের, উদ্ভিদ বিজ্ঞানী",
      title: "বায়ুদূষণ ও ফুসফুসের রোগ: গ্লোবাল স্টাডি”",
      description: "আমার মনে হয়, তুমি চাইলে আমি স্বাস্থ্য চিন্তা সেকশনের জন্য এক বছরের কন্টেন্ট ক্যালেন্ডার তৈরি করে দিতে পারি যেখানে মাসভিত্তিক দেশি ও বিদেশি",
      author: "বিস্তারিত পড়ুন"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=400&auto=format&fit=crop",
      category: "খাদ্য ও পুষ্টি",
      title: "ডায়াবেটিসে ব্রেকফাস্ট কেমন হবে?",
      description: "লো-জিআই খাবার, ফাইবার এবং প্রোটিনের সঠিক সমন্বয়।",
      author: "বিস্তারিত পড়ুন"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1541534401786-2077eed87a74?q=80&w=400&auto=format&fit=crop",
      category: "History",
      title: "শুরুতেই ২০-মিনিট ফুল-বডি রুটিন লো-জিআই খাবার, ফাইবার এবং প্রোটিনের সঠিক সমন্বয়।",
      description: "কোনো সরঞ্জাম ছাড়াই বাড়িতে করা যায় এমন ব্যায়াম।",
      author: "বিস্তারিত পড়ুন"
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=400&auto=format&fit=crop",
      category: "মানসিক স্বাস্থ্য",
      title: "মাইন্ডফুলনেসে শুরু: ৫ মিনিট অনুশীলন",
      description: "নবীনদের জন্য শ্বাস-প্রশ্বাস ও মনোযোগের কৌশল।",
      author: "বিস্তারিত পড়ুন"
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=400&auto=format&fit=crop",
      category: "মানসিক স্বাস্থ্য",
      title: "মাইন্ডফুলনেসে শুরু: ৫ মিনিট অনুশীলন",
      description: "নবীনদের জন্য শ্বাস-প্রশ্বাস ও মনোযোগের কৌশল।",
      author: "বিস্তারিত পড়ুন"
    }
  ];
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../URL/baseurl";

// Strip HTML tags and truncate
const truncateHTML = (html, maxLength = 60) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Hero = ({ title }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  const fetchContents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/content-section?section_name=home`);
      const result = await res.json();

      if (result.success) {
        // Sort by sequence
        const sorted = (result.items || []).sort((a, b) => a.sequence - b.sequence);
        setData(sorted);
      }
    } catch (err) {
      console.error("Failed to fetch content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);
>>>>>>> master

  // Show only first 4 if showAll is false
  const displayedData = showAll ? data : data.slice(0, 4);

<<<<<<< HEAD
  return (
    <div className="w-full py-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 ">
      {/* Header */}
      <div className='border-b flex justify-between items-center pb-3'>
        <h1 className='ml-9 font-bold text-lg sm:text-xl md:text-2xl text-[#6A1B9A]'>{title}</h1>
        <h1
          className='mr-9 text-[#1976D2] text-[12px] sm:text-sm md:text-[13px] font-bold cursor-pointer'
          onClick={() => setShowAll(true)} // load more on click
        >
          সমস্ত বিষয় পড়ুন
        </h1>
      </div>

      {/* Grid of Items */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pt-6 pl-9'>
        {displayedData.map((item) => (
          <div
            key={item.id}
            className='grid grid-cols-1 sm:grid-cols-3 gap-4 cursor-pointer transform transition-all duration-300 hover:-translate-y-1'
            onClick={() => navigate(`/content/details/${item?.id}`)}
          >
            <div className="col-span-1">
              <img
                src={item?.imageUrl}
                alt=''
                className='h-[200px] w-full sm:h-[150px] md:h-[180px] lg:h-[200px] object-cover rounded-2xl'
              />
            </div>
            <div className="col-span-2 flex flex-col justify-between">
              <div>
                <button className='px-3 sm:px-4 bg-[#E8D4F4] text-[11px] sm:text-[13px] rounded-full py-1'>{item?.category}</button>
              </div>
              <h1 className='font-semibold py-2 text-[13px] sm:text-[15px] leading-5 sm:leading-6'>{item?.title}</h1>
              <p className='text-[11px] sm:text-xs text-gray-700'>{item?.description}</p>
              <p className='py-2 text-[12px] sm:text-sm font-medium text-[#0170C0]'>{item?.author}</p>
            </div>
=======
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full py-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      {/* Header */}
      <div className="border-b flex justify-between items-center pb-3">
        <h1 className="ml-9 font-bold text-lg sm:text-xl md:text-2xl text-[#6A1B9A]">
          {title}
        </h1>
        {!showAll && data.length > 4 && (
          <h1
            className="mr-9 text-[#1976D2] text-[12px] sm:text-sm md:text-[13px] font-bold cursor-pointer"
            onClick={() => setShowAll(true)}
          >
            সমস্ত বিষয় পড়ুন
          </h1>
        )}
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-9 pt-6 pl-9">
        {displayedData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
            onClick={() => navigate(`/content/details/${item.id}`)}
          >
            <div className="col-span-1">
              <img
                src={`${BASE_URL}${item.image_url}`} // using API field
                alt={item.title}
                className="h-[200px] w-full sm:h-[150px] md:h-[180px] lg:h-[200px] object-cover rounded-2xl"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2 sm:gap-3">
              <div>
                <button className="px-3 sm:px-4 bg-[#E8D4F4] text-[18px] sm:text-[15px] rounded-full py-1">
                  {item.name || "General"} {/* category from API */}
                </button>
              </div>
              <h1 className="overflow-wrap font-semibold py-2 text-[22px] sm:text-[20px] leading-5 sm:leading-9 ">
                {item.title.length > 20
  ? item.title.slice(0, 30) + "..."
  : item.title}
              </h1>
              <p className="text-[18px] sm:text-x text-gray-700">
              {truncateHTML(item.description, 60)}
              </p>
              <p className="py-2 text-[12px] sm:text-sm font-medium text-[#0170C0]">
                {item.author || "বিস্তারিত পড়ুন"}
              </p>
            </div>



>>>>>>> master
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
