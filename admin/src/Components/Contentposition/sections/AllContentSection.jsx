import { Edit, Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../URL/baseurl";

/* ===============================
   SECTION OPTIONS
================================ */
const SECTION_OPTIONS = [
  { value: "home", label: "স্বাস্থ্য কথা" },
  { value: "health_protection", label: "স্বাস্থ্য সুরক্ষা" },
  { value: "recent_health", label: "সাম্প্রতিক স্বাস্থ্য" },
  { value: "featured", label: "সাম্প্রতিক স্বাস্থ্য" },
];

const HomeContentSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editSection, setEditSection] = useState("");

  /* ================= FETCH ================= */
  const fetchContents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/content-section`);
      const data = await res.json();

      const sorted = (data.items || []).sort((a, b) => a.sequence - b.sequence);
      setItems(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  /* ================= ACTIVE TOGGLE ================= */
  const toggleActive = async (item) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/content-section/update/${item.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: !item.active }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, active: !i.active } : i))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= SECTION EDIT ================= */
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditSection(item.section_name || "home");
  };

  const saveSection = async (id) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/content-section/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section_name: editSection }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, section_name: editSection } : i))
        );
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= UI ================= */
  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Content (Active/Deactive And Section Choose)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border shadow hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <img
              src={`${BASE_URL}${item.image_url}`}
              alt={item.title}
              className="h-36 w-full object-cover rounded-t-xl"
            />

            {/* BODY */}
            <div className="p-4 space-y-3">
              {/* TITLE */}
              <h3 className="font-semibold text-sm truncate">{item.title}</h3>

              {/* SEQUENCE */}
              <p className="text-xs text-gray-500">
                Sequence: <span className="font-semibold">{item.sequence}</span>
              </p>

              {/* SECTION */}
              {editingId === item.id ? (
                <div className="flex gap-2">
                  <select
                    value={editSection}
                    onChange={(e) => setEditSection(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-xs"
                  >
                    {SECTION_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => saveSection(item.id)} className="text-green-600">
                    <Save size={16} />
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-gray-400">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2 py-1 rounded bg-gray-100">
                    Section: {item.section_name}
                  </span>
                  <button onClick={() => startEdit(item)} className="text-blue-600">
                    <Edit size={14} />
                  </button>
                </div>
              )}

              {/* ACTIVE */}
              <button
                onClick={() => toggleActive(item)}
                className={`w-full py-1 rounded text-xs text-white ${
                  item.active ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                {item.active ? "Active" : "Inactive"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeContentSection;
