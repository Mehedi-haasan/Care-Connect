
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Edit } from "lucide-react";
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
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/api/get/detailscontent?id=${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Content not found");
        return res.json();
      })
      .then(data => {
        setContent(data.items?.[0]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
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
    categories.find(cat => cat.key === content.category_type)?.label || "";

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
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* CONTENT WRAPPER */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 -mt-20 relative z-10">

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">

          {/* BREADCRUMB */}
          <div className="text-xs sm:text-sm text-gray-500 mb-3 font-medium">
            {categoryLabel} &nbsp;›&nbsp; {content.sub_cate_type}
          </div>

          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-4">
            {content.title}
          </h1>

          {/* META */}
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
            <span className="font-medium">{content.name}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>{new Date(content.createdAt).toLocaleDateString()}</span>
          </div>

          {/* DIVIDER */}
          <div className="border-b mb-8" />

          {/* RICH TEXT CONTENT */}
          <article
  className="
    prose prose-gray
    prose-sm sm:prose-base md:prose-lg
    max-w-none
    leading-relaxed

    prose-p:my-4

    prose-img:mx-auto
    prose-img:rounded-xl
    prose-img:shadow
    prose-img:my-6

    prose-img:max-w-full
    sm:prose-img:max-w-[90%]
    md:prose-img:max-w-[75%]
    lg:prose-img:max-w-[65%]

    prose-img:max-h-[160px]
    sm:prose-img:max-h-[200px]
    md:prose-img:max-h-[240px]

    prose-img:object-cover

    prose-h1:text-2xl md:prose-h1:text-3xl
    prose-h2:text-xl md:prose-h2:text-2xl
    prose-h3:text-lg md:prose-h3:text-xl

    prose-ul:my-4
    prose-ol:my-4
    prose-li:my-2

    prose-a:text-blue-600
    hover:prose-a:underline

    prose-strong:text-gray-900
  "
  dangerouslySetInnerHTML={{ __html: content.description }}
/>
        </div>
      
        <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate(`/admin/content/edit/${content.id}`)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition"
            >
              <Edit size={16} /> Edit
            </button>
          </div>

      </div>
    </div>
  );
};

export default ContentDetails;
