<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

const Recenthealth = ({ title }) => {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      category: "ড. আবুল খায়ের, উদ্ভিদ বিজ্ঞানী",
      title: "বায়ুদূষণ ও ফুসফুসের রোগ: গ্লোবাল স্টাডি",
      description:
        "আমার মনে হয়, তুমি চাইলে আমি স্বাস্থ্য চিন্তা সেকশনের জন্য এক বছরের কন্টেন্ট ক্যালেন্ডার তৈরি করে দিতে পারি।",
      author: "বিস্তারিত পড়ুন",
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=400&auto=format&fit=crop",
      category: "খাদ্য ও পুষ্টি",
      title: "ডায়াবেটিসে ব্রেকফাস্ট কেমন হবে?",
      description: "লো-জিআই খাবার, ফাইবার এবং প্রোটিনের সঠিক সমন্বয়।",
      author: "বিস্তারিত পড়ুন",
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1541534401786-2077eed87a74?q=80&w=400&auto=format&fit=crop",
      category: "History",
      title: "শুরুতেই ২০-মিনিট ফুল-বডি রুটিন",
      description: "কোনো সরঞ্জাম ছাড়াই বাড়িতে করা যায় এমন ব্যায়াম।",
      author: "বিস্তারিত পড়ুন",
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=400&auto=format&fit=crop",
      category: "মানসিক স্বাস্থ্য",
      title: "মাইন্ডফুলনেসে শুরু: ৫ মিনিট অনুশীলন",
      description: "নবীনদের জন্য শ্বাস-প্রশ্বাস ও মনোযোগের কৌশল।",
      author: "বিস্তারিত পড়ুন",
    },
    {
      id: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=400&auto=format&fit=crop",
      category: "মানসিক স্বাস্থ্য",
      title: "মাইন্ডফুলনেসে শুরু: ৫ মিনিট অনুশীলন",
      description: "নবীনদের জন্য শ্বাস-প্রশ্বাস ও মনোযোগের কৌশল।",
      author: "বিস্তারিত পড়ুন",
    },
  ];

  return (
    <section className="w-full py-10">
      {/* Center Container */}
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="border-b flex justify-between items-center pb-3">
          <h1 className="font-extrabold text-xl text-[#6A1B9A]">
            {title}
          </h1>
          <h1 className="text-[#1976D2] font-semibold text-sm cursor-pointer">
            সমস্ত বিষয় পড়ুন
          </h1>
        </div>

        {/* Cards */}
        <div className="mt-6 space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {data.map((item) => (
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../URL/baseurl";

/* ================= HTML STRIP ================= */
const truncateHTML = (html, maxLength = 90) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const RecentHealth = ({ title }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  const fetchRecentHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/content-section?section_name=featured`
      );
      const result = await res.json();

      if (result.success) {
        // maintain sequence
        const sorted = (result.items || []).sort(
          (a, b) => a.sequence - b.sequence
        );
        setData(sorted);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentHealth();
  }, []);

  // show only first 4 unless expanded
  const visibleData = showAll ? data : data.slice(0, 4);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading...</div>
    );
  }

  return (
    <section className=" py-10">
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

        {/* ===== CONTENT LIST (OLD DESIGN) ===== */}
        <div className="mt-6 space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {visibleData.map((item) => (
>>>>>>> master
            <div
              key={item.id}
              onClick={() => navigate(`/content/details/${item.id}`)}
              className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl
                         cursor-pointer transition-transform duration-300
                         hover:-translate-y-1"
            >
              {/* Image */}
              <div className="w-full sm:w-1/3 h-48">
                <img
<<<<<<< HEAD
                  src={item.imageUrl}
=======
                  src={`${BASE_URL}${item.image_url}`}
>>>>>>> master
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

<<<<<<< HEAD
              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <span className="inline-block px-4 py-1 text-[13px] bg-[#E8D4F4] rounded-full">
                    {item.category}
=======
              {/* Text */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <span className="inline-block px-4 py-1 text-[13px] bg-[#E8D4F4] rounded-full">
                    {item.name || "স্বাস্থ্য"}
>>>>>>> master
                  </span>

                  <h2 className="font-semibold text-[15px] mt-3 leading-6">
                    {item.title}
                  </h2>

                  <p className="text-xs text-gray-700 mt-2 leading-5">
<<<<<<< HEAD
                    {item.description}
=======
                    {truncateHTML(item.description, 90)}
>>>>>>> master
                  </p>
                </div>

                <p className="text-sm text-[#1976D2] mt-3">
<<<<<<< HEAD
                  {item.author}
=======
                  বিস্তারিত পড়ুন
>>>>>>> master
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

<<<<<<< HEAD
export default Recenthealth;
=======
export default RecentHealth;
>>>>>>> master
