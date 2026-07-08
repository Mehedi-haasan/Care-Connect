import { Edit, Layers, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../URL/baseurl";

const CATEGORY_OPTIONS = [
  { label: "All", value: "" },
  { label: "Maternal Health", value: "maternal_health" },
  { label: "Child Care", value: "child_care" },
  { label: "Family Planning", value: "family_planning" },
  { label: "Adolescent Health", value: "adolescent_health" },
  { label: "Mental Health", value: "mental_health" },
  { label: "Elderly Health", value: "elderly_health" },
  { label: "General Health", value: "general_health" },
  { label: "Women Health", value: "women_health" },
  { label: "Nutrition", value: "nutrition" },
  { label: "Fitness", value: "fitness" },
];

const Home = () => {
  const navigate = useNavigate();

  const [contents, setContents] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch contents from backend
  const fetchContents = async () => {
    try {
      setLoading(true);
      const url = category
        ? `${BASE_URL}/api/get/content?category_type=${encodeURIComponent(category)}`
        : `${BASE_URL}/api/get/content`;
      const res = await fetch(url);
      const data = await res.json();
      setContents(data.items || []);
    } catch (err) {
      console.error(err);
      setContents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, [category]);

  // Delete content
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/delete/content/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        alert("Content deleted successfully!");
        fetchContents();
      } else {
        alert(result.message || "Failed to delete content");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting content");
    }
  };

  // Filtered contents based on search
  const filteredContents = contents.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Content Management</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, title, or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 py-2 border rounded-lg"
            />
          </div>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-56 px-4 py-2 border rounded-lg"
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Create Button */}
          <button
            onClick={() => navigate("/admin/content/create")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} /> Create
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && <div className="text-center text-gray-500 mt-20">Loading...</div>}

      {/* Empty */}
      {!loading && filteredContents.length === 0 && (
        <div className="text-center text-gray-500 mt-20">No content found</div>
      )}

      {/* Content Grid */}
      {!loading && filteredContents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContents.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow flex flex-col hover:shadow-lg transition-shadow duration-200">
             <img
                onClick={() => navigate(`/admin/details/${item.id}`)}
                src={`${BASE_URL}${item?.image_url}`}
                
                alt={item.name}
                className="h-40 object-cover rounded-t-xl cursor-pointer"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{item.title}</p>
                <div className="flex justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Layers size={14} /> {item.category_type}
                  </span>
                  <span>Pos: {item.sequence}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => navigate(`/admin/content/edit/${item.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
