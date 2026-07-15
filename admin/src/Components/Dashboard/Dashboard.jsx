import React from "react";
import {
  Users,
  Wifi,
  Activity,
  Server,
  ArrowUpRight,
  Bell,
  Settings,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "12,450",
      icon: <Users size={28} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Connections",
      value: "8,932",
      icon: <Wifi size={28} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Network Traffic",
      value: "1.8 TB",
      icon: <Activity size={28} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Running Servers",
      value: "32",
      icon: <Server size={28} />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>
          <p className="text-gray-400 mt-2">
            Monitor your network and system performance in real-time.
          </p>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
            <Bell />
          </button>
          <button className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
            <Settings />
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${item.color} p-6 rounded-3xl shadow-xl hover:scale-105 transition duration-300`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-80">{item.title}</p>
                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div className="bg-white/20 p-4 rounded-2xl">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold">
              Recent Activities
            </h2>
            <button className="text-cyan-400 hover:text-cyan-300">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              "New user registered",
              "Server Backup Completed",
              "Network Maintenance Finished",
              "New Support Ticket Created",
              "Bandwidth Usage Alert",
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-slate-800 p-4 rounded-xl hover:bg-slate-700 transition"
              >
                <div>
                  <p>{activity}</p>
                  <span className="text-xs text-gray-400">
                    {index + 1} hour ago
                  </span>
                </div>

                <ArrowUpRight className="text-cyan-400" />
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
          <h2 className="text-xl font-bold mb-5">
            System Status
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span>CPU Usage</span>
                <span>72%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full">
                <div className="w-[72%] h-full bg-cyan-500 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Memory</span>
                <span>58%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full">
                <div className="w-[58%] h-full bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Storage</span>
                <span>84%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full">
                <div className="w-[84%] h-full bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-cyan-600 hover:bg-cyan-700 p-3 rounded-xl transition">
                Add User
              </button>

              <button className="bg-purple-600 hover:bg-purple-700 p-3 rounded-xl transition">
                Generate Report
              </button>

              <button className="bg-green-600 hover:bg-green-700 p-3 rounded-xl transition">
                Restart Server
              </button>

              <button className="bg-orange-600 hover:bg-orange-700 p-3 rounded-xl transition">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500">
        © 2026 ADN Telecom Dashboard
      </div>
    </div>
  );
};

export default Dashboard;