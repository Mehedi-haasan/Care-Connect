import { Hash, Layers, ToggleLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../URL/baseurl";

const categoryMap = {
 maternal_health: [
      "মাতৃত্বের প্রস্তুতি",
      "গর্ভকালীন শিশুর বিকাশ",
      "প্রয়োজনীয় পুষ্টি",
      "গর্ভকালীন অসুস্থতা",
      "নিরাপদ ওষুধ ও সাপ্লিমেন্ট",
      "প্রসব প্রস্তুতি",
      "নবজাতকের যত্ন",
      "প্রসব পরবর্তী সুস্থতা",
      "মাতৃ পরিচয়ে যাত্রা",
      "মাতৃত্বকালীন মানসিক স্বাস্থ্য",
    ],
    child_care: [
      "নবজাতক স্বাস্থ্য (০–২ মাস)",
      "শিশু স্বাস্থ্য (২ মাস–১ বছর)",
      "টডলার স্বাস্থ্য (১–৩ বছর)",
      "প্রি-স্কুল স্বাস্থ্য (৩–৫ বছর)",
      "প্রাইমারি স্কুল বয়সী স্বাস্থ্য (৬–১০ বছর)",
      "সাধারণ স্বাস্থ্য বিষয়",
      "শিশুর খাদ্য ও পুষ্টি",
    ],
    family_planning: [
      "মৌলিক ধারণা ও গুরুত্ব",
      "প্রয়োজনীয়তা ও সুবিধা",
      "নারীদের পদ্ধতি",
      "পুরুষদের পদ্ধতি",
      "নিরাপত্তা ও পার্শ্বপ্রতিক্রিয়া",
      "জরুরি পরিবার পরিকল্পনা",
      "বন্ধ্যতা ও সমাধান",
      "সন্তান নেওয়ার সঠিক সময়",
      "যৌথ সিদ্ধান্ত ও অংশগ্রহণ",
      "সেবা, চ্যালেঞ্জ ও সচেতনতা",
    ],
    adolescent_health: [
      "বয়ঃসন্ধিকাল",
      "ব্যক্তিগত পরিচ্ছন্নতা",
      "পুষ্টিকর খাদ্যাভ্যাস",
      "দৈহিক ফিটনেস",
      "মানসিক সুস্থতা",
      "আত্মরক্ষা কৌশল",
      "নিরাপদ প্রযুক্তি ব্যবহার",
      "সুস্থ সম্পর্ক গঠন",
      "প্রজনন স্বাস্থ্য",
      "শিক্ষা ও ক্যারিয়ার প্রস্তুতি",
      "ক্ষতিকর অভ্যাস পরিহার",
    ],
    mental_health: [
      "মানসিক স্বাস্থ্য পরিচিতি",
      "মানসিক সমস্যা ও লক্ষণ",
      "শিশু-কিশোর মানসিক বিকাশ",
      "নারী ও মাতৃত্বকালীন মানসিক স্বাস্থ্য",
      "প্রবীণদের মানসিক যত্ন",
      "কর্মক্ষেত্রে মানসিক স্বাস্থ্য",
      "ঝুঁকিপূর্ণ অবস্থা",
      "ট্রমা ও পুনর্বাসন",
      "চিকিৎসা ও সহায়তা",
      "প্রতিরোধ ও উন্নয়ন",
      "সুস্থ মনের অভ্যাস",
    ],
    elderly_health: [
      "প্রবীণ স্বাস্থ্য পরিচিতি",
      "শারীরিক স্বাস্থ্য",
      "মানসিক স্বাস্থ্য",
      "প্রয়োজনীয় খাদ্য ও পুষ্টি",
      "প্রতিরোধমূলক স্বাস্থ্যসেবা",
      "প্রবীণদের যত্ন",
      "পারিবারিক ও সামাজিক দায়িত্ব",
      "পুনর্বাসন ও সহায়ক সেবা",
      "সামাজিক ও অর্থনৈতিক নিরাপত্তা",
      "স্বাস্থ্যকর জীবনযাপন",

    ],
    general_health: [
      "ব্যক্তিগত স্বাস্থ্যবিধি",
      "পারিবারিক স্বাস্থ্যবিধি",
      "পরিবেশ ও পেশাগত স্বাস্থ্য",
      "প্রাথমিক চিকিৎসা",
      "জরুরি স্বাস্থ্যসেবা",
      "প্রতিরোধমূলক স্বাস্থ্যসেবা",
      "টিকা ও ইমিউনাইজেশন",
      "পুষ্টি ও খাদ্যাভ্যাস",
      "জরুরি স্বাস্থ্যসেবা",
    ],
    women_health: [
      "খাদ্য ও পুষ্টি",
      "শারীরিক স্বাস্থ্য",
      "প্রজনন স্বাস্থ্য",
      "হরমোনাল যত্ন",
      "রোগ প্রতিকার",
      "মানসিক স্বাস্থ্য",
      "ফিটনেস ও মেডিটেশন",
      "সৌন্দর্য ও যত্ন",
      "পারিবারিক দায়িত্ব",
      "নিরাপদ জীবন",
    ],
    nutrition: [
      "সুষম খাদ্য",
      "ভিটামিন ও খনিজ",
      "শিশু ও কিশোর পুষ্টি",
      "গর্ভকালীন ও মাতৃ পুষ্টি",
      "বয়স্কদের পুষ্টি",
      "রোগ নির্দিষ্ট খাদ্যাভ্যাস",
      "বাংলাদেশি খাবার ও পুষ্টি",
      "ডায়েট ট্রেন্ড ও ভ্রান্ত ধারণা",
    ],
    fitness: [
      "দৈনন্দিন ব্যায়াম",
      "কার্ডিওভাসকুলার ফিটনেস",
      "শক্তি ও পেশি গঠন",
      "ফিটনেস ফর স্পেশাল গ্রুপস",
      "মানসিক স্বাস্থ্য ও ফিটনেস",
      "ওজন নিয়ন্ত্রণ",
      "স্পোর্টস ফিটনেস",
    ],
  };


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

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

const EditContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [showPreviewContent, setShowPreviewContent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    title: "",
    description: "",
    image_url: "",
    sequence: 1,
    active: true,
    category_type: "",
    sub_cate_type: "",
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (!id) return;

    const fetchContent = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/get/content/${id}`);
        if (!res.ok) throw new Error("Failed to fetch content. Check server & CORS.");
        const data = await res.json();
        if (data.success && data.item) {
          setFormData({ ...data.item });
          setSelectedCategory(data.item.category_type || "");
          setPreview(data.item.image_url || "");
        }
      } catch (err) {
        console.error("Error fetching content:", err);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setFormData((prev) => ({ ...prev, category_type: value, sub_cate_type: "" }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      for (const key in formData) {
        if (key !== "image_url") form.append(key, formData[key]);
      }
      if (file) form.append("image", file);

      const res = await fetch(`${BASE_URL}/api/update/content/${id}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to update content. Check backend & CORS.");
      const data = await res.json();
      if (data.success) {
        alert("✅ Content updated successfully");
        navigate("/admin/content/create");
      } else {
        throw new Error(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Update failed: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  const categoryLabel =
    categories.find((cat) => cat.key === formData.category_type)?.label || "";

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Content</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block mb-1">Name</label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded"
                required
              />
            </div>
          </div>

          {/* SKU */}
          <div>
            <label className="block mb-1">SKU</label>
            <div className="relative">
              <Layers className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1">Category</label>
            <select
              value={formData.category_type}
              onChange={handleCategoryChange}
              className="w-full py-2 border rounded"
              required
            >
              <option value="">Select</option>
              {Object.keys(categoryMap).map((k) => (
                <option key={k} value={k}>
                  {k.replace("_", " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="block mb-1">Sub Category</label>
            <select
              name="sub_cate_type"
              value={formData.sub_cate_type}
              onChange={handleChange}
              disabled={!selectedCategory}
              className="w-full py-2 border rounded"
              required
            >
              <option value="">Select</option>
              {categoryMap[selectedCategory]?.map((sub, i) => (
                <option key={i} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block mb-1">Image</label>
            <input type="file" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview.startsWith("blob:") ? preview : `${BASE_URL}${preview}?t=${Date.now()}`}
                alt="preview"
                className="w-48 mt-3 rounded"
              />
            )}
          </div>

          {/* Title */}
          <div className="md:col-span-2">
            <label className="block mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full py-2 border rounded"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2">Description</label>
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
              modules={modules}
              formats={formats}
            />
          </div>

          {/* Active */}
          <div className="md:col-span-2 flex items-center gap-3">
            <ToggleLeft />
            <span>Active</span>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/content/create")}
              className="px-6 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setShowPreviewContent(true)}
              className="px-6 py-2 bg-gray-700 text-white rounded"
            >
              Preview
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">
              Update
            </button>
          </div>
        </form>

        {/* LIVE PREVIEW SECTION */}
        {showPreviewContent && (
          <div className="bg-gray-50 mt-12 min-h-[400px]">
            {/* HERO IMAGE */}
            {preview && (
              <div className="relative w-full max-h-[380px] overflow-hidden">
                <img
                  src={preview.startsWith("blob:") ? preview : `${BASE_URL}${preview}?t=${Date.now()}`}
                  alt={formData.title}
                  className="w-full h-[220px] sm:h-[280px] md:h-[360px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            {/* CONTENT CARD */}
            <div className="max-w-4xl mx-auto px-5 sm:px-8 -mt-20 relative z-10">
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
                {/* Breadcrumb */}
                <div className="text-xs sm:text-sm text-gray-500 mb-3 font-medium">
                  {categoryLabel} &nbsp;›&nbsp; {formData.sub_cate_type}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-4">
                  {formData.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
                  <span className="font-medium">{formData.name}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span>{new Date(formData.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Divider */}
                <div className="border-b mb-8" />

                {/* Rich Text */}
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
                  dangerouslySetInnerHTML={{ __html: formData.description }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditContent;
