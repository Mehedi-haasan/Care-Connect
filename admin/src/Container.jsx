import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

// Replace with your default user image if needed
import DefaultUser from "./Components/Logo/userProfile.png";

// Sidebar navigation items
const navItems = [
  { id: 1, name: "Dashboard", route: "", icon: "mdi:view-dashboard" },
  { id: 2, name: "Manage Content", route: "admin/Managecontent", icon: "mdi:home" },
  { id: 3, name: "Set Content Position", route: "admin/position_home", icon: "mdi:home" },
  { id: 4, name: "Videos", route: "admin/video", icon: "mdi:plus-box" },
  { id: 5, name: "Settings", route: "settings", icon: "mdi:cog" },
];

const Container = () => {
  const [userInfo, setUserInfo] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch user info
  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "https://server.careconnect.com.bd/api/auth/signin",
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserInfo(data.user || {});
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r w-64 transform transition-transform duration-300 z-20
        md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo + User */}
        <div className="flex items-center gap-3 p-5 border-b">
          <img
            src={userInfo?.image_url || DefaultUser}
            alt={`${userInfo?.first_name || "User"} profile`}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-bold">
              {userInfo?.first_name} {userInfo?.last_name}
            </h1>
            <NavLink to="" className="text-sm underline">
              View Profile
            </NavLink>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-2 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={`/${item.route}`}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 text-lg font-semibold rounded hover:bg-gray-200 ${
                  isActive ? "bg-gray-200" : ""
                }`
              }
            >
              <Icon icon={item.icon} width="20" />
              {item.name}
            </NavLink>
          ))}

          {/* Logout */}
          <NavLink
            to="/"
            onClick={() => localStorage.setItem("token", "")}
            className="flex items-center gap-2 p-2 text-lg font-semibold rounded hover:bg-gray-200 mt-2"
          >
            <Icon icon="uiw:logout" width="20" />
            Logout
          </NavLink>
        </nav>
      </div>

      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-30 md:hidden bg-white p-2 rounded shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Icon icon="mdi:menu" width="24" />
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-64 overflow-y-auto">
        {/* Use padding per page for better control */}
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
          <Outlet /> {/* Renders Dashboard, Home, CreatePost, etc */}
        </div>
      </div>
    </div>
  );
};

export default Container;
