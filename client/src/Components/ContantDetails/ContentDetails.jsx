import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BASE_URL from "../URL/baseurl";


const ContentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ FIXED HERE

  const [content, setContent] = useState(null);
  const [relatedContents, setRelatedContents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [error, setError] = useState("");

  const stripHTML = (html = "") => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };


  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/get/single/content/${id}`);
      const data = await res.json();
      setRelatedContents(data?.related_data)
      setContent(data.items);
      setLoading(false);

    } catch (err) {

      setLoading(false);

    }
  };

  useEffect(() => {

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


  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO IMAGE */}
      {content.image_url && (
        <div className="relative w-full max-h-[380px] overflow-hidden">
          <img src={content.image_url}
            alt={content.title}
            className="w-full h-[220px] sm:h-[280px] md:h-[360px] object-cover"
          />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-5 -mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <div className="text-sm text-gray-500 mb-3">
            {content?.category?.name} › {content.sub_category?.name}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {relatedContents?.map((item) => (
            <Link
              key={item.id}
              to={`/content/details/${item.id}`}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden block"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="text-sm font-semibold line-clamp-2 mb-2">
                  {item?.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 mb-2">
                  {stripHTML(item?.description).slice(0, 80)}...
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(item?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full">
            আরো দেখুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
