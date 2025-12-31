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
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <span className="inline-block px-4 py-1 text-[13px] bg-[#E8D4F4] rounded-full">
                    {item.category}
                  </span>

                  <h2 className="font-semibold text-[15px] mt-3 leading-6">
                    {item.title}
                  </h2>

                  <p className="text-xs text-gray-700 mt-2 leading-5">
                    {item.description}
                  </p>
                </div>

                <p className="text-sm text-[#1976D2] mt-3">
                  {item.author}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Recenthealth;
