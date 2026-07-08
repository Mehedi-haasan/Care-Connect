import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Image, Grid, Star } from "lucide-react";

const subsections = [
  { path: "allcontent", label: "All Content", icon: <Image size={16} /> },
  { path: "home_content", label: "স্বাস্থ্য কথা", icon: <Grid size={16} /> },
  { path: "health_protection", label: "স্বাস্থ্য সুরক্ষা", icon: <Grid size={16} /> },
  { path: "recent_health", label: "সাম্প্রতিক স্বাস্থ্য", icon: <Grid size={16} /> },
  { path: "featured", label: "সাম্প্রতিক স্বাস্থ্য", icon: <Star size={16} /> },
];

const HomeSections = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 overflow-x-auto no-scrollbar">
        {subsections.map((sub) => {
          const active = location.pathname.includes(sub.path);
          return (
            <NavLink
              key={sub.path}
              to={sub.path}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all duration-200
                ${active ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
              `}
            >
              {sub.icon}
              {sub.label}
              {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full" />}
            </NavLink>
          );
        })}
      </div>

      {/* Subsection Content */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner min-h-[60vh] transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeSections;
