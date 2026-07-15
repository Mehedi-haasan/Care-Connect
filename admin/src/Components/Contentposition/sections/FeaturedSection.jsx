import React, { useEffect, useState } from "react";
import {
  Edit,
  GripVertical,
  Save,
  X,
} from "lucide-react";

import BASE_URL from "../../URL/baseurl";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const SECTION_OPTIONS = [
  { value: "home", label: "স্বাস্থ্য কথা" },
  { value: "health_protection", label: "স্বাস্থ্য সুরক্ষা" },
  { value: "recent_health", label: "সাম্প্রতিক স্বাস্থ্য" },
  { value: "featured", label: "সাম্প্রতিক স্বাস্থ্য" },
];

const FeaturedSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editSection, setEditSection] = useState("");

  const fetchContents = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/content-section`
      );

      const data = await res.json();

      const featuredItems = (data.items || [])
        .filter(
          (item) => item.section_name === "featured"
        )
        .sort((a, b) => a.sequence - b.sequence);

      setItems(featuredItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const toggleActive = async (item) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/content-section/update/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: !item.active,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setItems((prev) =>
          prev.map((row) =>
            row.id === item.id
              ? {
                  ...row,
                  active: !row.active,
                }
              : row
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(items);

    const [removed] = reordered.splice(
      result.source.index,
      1
    );

    reordered.splice(
      result.destination.index,
      0,
      removed
    );

    const updated = reordered.map(
      (item, index) => ({
        ...item,
        sequence: index + 1,
      })
    );

    setItems(updated);

    try {
      await fetch(
        `${BASE_URL}/api/admin/content-section/update-sequence`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: updated.map((item) => ({
              id: item.id,
              sequence: item.sequence,
            })),
          }),
        }
      );
    } catch (error) {
      console.error(
        "Sequence update failed",
        error
      );
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditSection(
      item.section_name || "featured"
    );
  };

  const saveSection = async (id) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/content-section/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            section_name: editSection,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  section_name: editSection,
                }
              : item
          )
        );

        setEditingId(null);

        if (editSection !== "featured") {
          fetchContents();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading Featured Content...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Featured Content Management
        </h1>

        <p className="text-gray-500 mt-2">
          Drag and drop to change
          content position.
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="featured-content">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-white rounded-2xl border shadow hover:shadow-lg transition duration-300 overflow-hidden"
                    >
                      <img
                        src={`${BASE_URL}${item.image_url}`}
                        alt={item.title}
                        className="w-full h-52 object-cover"
                      />

                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-sm line-clamp-2">
                            {item.title}
                          </h3>

                          <span
                            {...provided.dragHandleProps}
                            className="cursor-grab text-gray-400"
                          >
                            <GripVertical
                              size={18}
                            />
                          </span>
                        </div>

                        <div className="mt-3">
                          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                            Position :
                            {item.sequence}
                          </span>
                        </div>

                        <div className="mt-3">
                          {editingId === item.id ? (
                            <div className="flex gap-2">
                              <select
                                value={editSection}
                                onChange={(e) =>
                                  setEditSection(
                                    e.target.value
                                  )
                                }
                                className="flex-1 border rounded px-2 py-1 text-sm"
                              >
                                {SECTION_OPTIONS.map(
                                  (section) => (
                                    <option
                                      key={
                                        section.value
                                      }
                                      value={
                                        section.value
                                      }
                                    >
                                      {
                                        section.label
                                      }
                                    </option>
                                  )
                                )}
                              </select>

                              <button
                                onClick={() =>
                                  saveSection(
                                    item.id
                                  )
                                }
                                className="text-green-600"
                              >
                                <Save size={16} />
                              </button>

                              <button
                                onClick={() =>
                                  setEditingId(
                                    null
                                  )
                                }
                                className="text-red-500"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {
                                  item.section_name
                                }
                              </span>

                              <button
                                onClick={() =>
                                  startEdit(
                                    item
                                  )
                                }
                                className="text-blue-600"
                              >
                                <Edit size={15} />
                              </button>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() =>
                            toggleActive(item)
                          }
                          className={`w-full mt-4 py-2 rounded-lg text-white text-sm font-medium ${
                            item.active
                              ? "bg-green-600"
                              : "bg-gray-400"
                          }`}
                        >
                          {item.active
                            ? "Active"
                            : "Inactive"}
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FeaturedSection;
