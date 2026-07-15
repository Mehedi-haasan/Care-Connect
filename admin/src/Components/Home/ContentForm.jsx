import { Hash, Layers, ToggleLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../URL/baseurl";

/* ================= CATEGORY → SUBCATEGORY MAP ================= */
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


/* ================= CUSTOM IMAGE HANDLER ================= */
function imageHandler() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    if (!input.files) return;
    const editor = this.quill;

    const file = input.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${BASE_URL}/api/upload/image`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.path) {
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", `${BASE_URL}${data.path}`);
        editor.setSelection(range.index + 1);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed");
    }
  };
}

/* ================= QUILL MODULES ================= */
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
  },
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
  "video",
];

/* ================= CONTENT FORM COMPONENT ================= */
const ContentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    image_url: "",
    sku: "",
    sequence: 0,
    active: true,
    category_type: "",
    sub_cate_type: "",
    section_name: "---", // default value
  });
  
  /* ================= FETCH FOR EDIT ================= */
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/get/content/${id}`);
          const data = await res.json();
          if (data.success && data.item) {
            setFormData({
              ...data.item,
              category_type: data.item.category_type || "",
              sub_cate_type: data.item.sub_cate_type || "",
            });
            setSelectedCategory(data.item.category_type || "");
            setPreview(`${BASE_URL}${data.item.image_url || ""}`);
          }
        } catch (err) {
          console.error("Fetch error:", err);
        }
      })();
    }
  }, [id]);

  /* ================= HANDLERS ================= */
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
    setFormData((prev) => ({
      ...prev,
      category_type: value,
      sub_cate_type: "",
    }));
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      setUploading(true);
      const res = await fetch(`${BASE_URL}/api/upload/image`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, image_url: result.path }));
        setPreview(`${BASE_URL}${result.path}`);
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Image upload error");
    } finally {
      setUploading(false);
    }
  };

  /* ================= FORM SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = id
      ? `${BASE_URL}/api/update/content/${id}`
      : `${BASE_URL}/api/create/content`;

    try {
      const res = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Content saved successfully");
        navigate("/admin/content/create");
      } else {
        alert("❌ " + data.message || "Unknown error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Backend error – check console");
    }
  };


  /* ================= UI ================= */
  
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {id ? "Edit Content" : "Create Content"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="relative">
            <label className="block font-medium text-gray-700 mb-2">Name</label>
            <Hash className="absolute left-3 top-10 text-gray-400" size={18} />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* SKU */}
          <div className="relative">
            <label className="block font-medium text-gray-700 mb-2">Content ID</label>
            <Layers className="absolute left-3 top-10 text-gray-400" size={18} />
            <input
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full pl-10 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category_type}
              onChange={handleCategoryChange}
              className="w-full py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select</option>
              {Object.keys(categoryMap).map((key) => (
                <option key={key} value={key}>
                  {key.replace("_", " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Sub Category</label>
            <select
              name="sub_cate_type"
              value={formData.sub_cate_type}
              onChange={handleChange}
              disabled={!selectedCategory}
              className="w-full py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select</option>
              {categoryMap[selectedCategory]?.map((sub, i) => (
                <option key={i} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full py-2 border rounded-lg"
            />
            {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-48 mt-4 rounded-lg shadow-md object-cover"
              />
            )}
          </div>

          {/* Title */}
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-2">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              modules={modules}
              formats={formats}
              placeholder="Write description here with images, links, videos..."
              className="bg-white rounded-lg shadow-sm"
            />
          </div>

          {/* Active */}
          <div className="md:col-span-2 flex items-center gap-4">
            <ToggleLeft className="text-gray-600" />
            <label className="font-medium text-gray-700">Active</label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-300"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/home")}
              className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentForm;
