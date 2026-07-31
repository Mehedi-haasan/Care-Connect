import { useNavigate } from "react-router-dom";

const AllDoctors = ({ data }) => {
  const navigate = useNavigate();



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