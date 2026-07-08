import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BASE_URL from "../URL/baseurl";

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

const ContentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ FIXED HERE

  const [content, setContent] = useState(null);
  const [relatedContents, setRelatedContents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [error, setError] = useState("");

  const stripHTML = (html = "") => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setRelatedLoading(true);

        // ================= MAIN CONTENT =================
        const res = await fetch(
          `${BASE_URL}/api/get/detailscontent?id=${id}`
        );

        if (!res.ok) throw new Error("Content not found");

        const data = await res.json();
        const mainItem = data.items?.[0];

        setContent(mainItem);
        setLoading(false);

        // ================= RELATED CONTENT =================
        if (mainItem?.category_type) {
          const relRes = await fetch(
            `${BASE_URL}/api/get/content?category=${mainItem.category_type}&limit=20`
          );

          if (!relRes.ok) throw new Error("Related fetch failed");

          const relData = await relRes.json();

          const filtered = (relData.items || []).filter(
            (item) => item.id !== mainItem.id
          );

          setRelatedContents(filtered);
        }

        setRelatedLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setRelatedLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return <div className="py-32 text-center text-gray-500">Loading...</div>;

  if (error)
    return (
      <div className="py-32 text-center text-red-500 font-semibold">
        {error}
      </div>
    );

  if (!content)
    return <div className="py-32 text-center">No content available</div>;

  const categoryLabel =
    categories.find((cat) => cat.key === content.category_type)?.label || "";

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO IMAGE */}
      {content.image_url && (
        <div className="relative w-full max-h-[380px] overflow-hidden">
          <img
            src={`${BASE_URL}${content.image_url}`}
            alt={content.title}
            className="w-full h-[220px] sm:h-[280px] md:h-[360px] object-cover"
          />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-5 -mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <div className="text-sm text-gray-500 mb-3">
            {categoryLabel} › {content.sub_cate_type}
          </div>

          <h1 className="text-3xl font-bold mb-4">
            {content.title}
          </h1>

          <div className="text-sm text-gray-600 mb-6">
            {content.name} •{" "}
            {new Date(content.createdAt).toLocaleDateString()}
          </div>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
        </div>
      </div>

      {/* RELATED ARTICLES */}
      <div className="max-w-6xl mx-auto px-5 mt-12 pb-16">
        <h2 className="text-2xl font-bold mb-6">
          সম্পর্কিত আরও বিষয়বস্তু
        </h2>

        {relatedLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {relatedContents.slice(0, visibleCount).map((item) => (
                <Link
                  key={item.id}
                  to={`/content/details/${item.id}`}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden block"
                >
                  {item.image_url && (
                    <img
                      src={`${BASE_URL}${item.image_url}`}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                  )}

                  <div className="p-4">
                    <h3 className="text-sm font-semibold line-clamp-2 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-3 mb-2">
                      {stripHTML(item.description).slice(0, 80)}...
                    </p>

                    <p className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* LOAD MORE */}
            {visibleCount < relatedContents.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((p) => p + 8)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full"
                >
                  আরো দেখুন
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContentDetails;