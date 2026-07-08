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
                  src={`${BASE_URL}${item.image_url}`}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <span className="inline-block px-4 py-1 text-[13px] bg-[#E8D4F4] rounded-full">
                    {item.name || "স্বাস্থ্য"}
                  </span>

                  <h2 className="font-semibold text-[15px] mt-3 leading-6">
                    {item.title}
                  </h2>

                  <p className="text-xs text-gray-700 mt-2 leading-5">
                    {truncateHTML(item.description, 90)}
                  </p>
                </div>

                <p className="text-sm text-[#1976D2] mt-3">
                  বিস্তারিত পড়ুন
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RecentHealth;
