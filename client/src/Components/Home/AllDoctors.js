import { useNavigate } from "react-router-dom";

const AllDoctors = () => {
  const navigate = useNavigate();

  const data = [
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

  return (
     <section className=" py-10">
     <div className="w-full py-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      {/* Header */}
      <div className="border-b flex justify-between items-center pb-3">
        <h1 className="ml-9 font-bold text-lg sm:text-xl md:text-2xl text-[#6A1B9A]">
          দক্ষ ও অভিজ্ঞ স্বাস্থ্যজীবীগণ
        </h1>

          <button className="text-[#1976D2] font-semibold text-sm hover:underline">
            সমস্ত বিষয় পড়ুন
          </button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/content/details/${item.id}`)}
              className="flex items-center bg-white rounded-xl border p-3
                         cursor-pointer transition-all duration-300
                         hover:-translate-y-1 hover:shadow-md"
            >
              {/* Image */}
              <img
                src={item.imageUrl}
                alt={item.author}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
              />

              {/* Info */}
              <div className="flex-1 pl-4">
                <span className="inline-block text-xs bg-[#E8D4F4] px-3 py-1 rounded-full">
                  {item.title}
                </span>

                <h2 className="font-semibold text-sm sm:text-base mt-2">
                  {item.author}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AllDoctors;