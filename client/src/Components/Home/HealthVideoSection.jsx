import { useEffect, useState } from "react";
import BASE_URL from "../URL/baseurl";
import { Play, Heart } from "lucide-react";

const HealthVideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [likedVideos, setLikedVideos] = useState([]);

  // ✅ FETCH VIDEOS
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/video`);

        if (Array.isArray(res.data)) {
          setVideos(res.data);

          if (res.data.length > 0) {
            setCurrentVideo(`${BASE_URL}${res.data[0].video_url}`);
            setActiveId(res.data[0].id);
          }
        }
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    fetchVideos();
  }, []);

  // ❤️ LIKE
  const toggleLike = (id) => {
    setLikedVideos((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 md:px-12 lg:px-24 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-blue-900">
          🎥 Health Videos
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Watch important health-related videos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ================= MAIN VIDEO ================= */}
        <div className="lg:col-span-3">

          {currentVideo ? (
            <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
              <video
                src={currentVideo}
                className="w-full h-[400px] object-cover"
                controls
              />
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center bg-gray-200 rounded-2xl">
              <p className="text-gray-500">No video available</p>
            </div>
          )}

        </div>

        {/* ================= VIDEO LIST ================= */}
        <div className="lg:col-span-2 max-h-[400px] overflow-y-auto space-y-4 pr-2">

          {videos.length === 0 && (
            <p className="text-gray-400 text-center">No videos found</p>
          )}

          {videos.map((item) => {
            const videoUrl = item.video_url
              ? `${BASE_URL}${item.video_url}`
              : "";

            const thumbUrl = item.thumbnail_url
              ? `${BASE_URL}${item.thumbnail_url}`
              : "";

            const isActive = activeId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (videoUrl) {
                    setCurrentVideo(videoUrl);
                    setActiveId(item.id);
                  }
                }}
                className={`flex gap-3 p-3 rounded-xl cursor-pointer transition ${
                  isActive
                    ? "bg-blue-700 text-white shadow"
                    : "bg-white hover:bg-gray-100"
                }`}
              >

                {/* THUMB */}
                <div className="relative w-[100px] h-[70px] rounded-lg overflow-hidden flex-shrink-0">

                  {thumbUrl ? (
                    <img
                      src={thumbUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <Play size={18} />
                    </div>
                  )}

                  {/* PLAY ICON */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition">
                    <Play className="text-white" size={20} />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex-1 flex flex-col justify-between">

                  <p className="text-sm font-semibold">
                    {item.title || "Untitled video"}
                  </p>

                  {/* LIKE */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                  >
                    <Heart
                      size={18}
                      className={
                        likedVideos.includes(item.id)
                          ? "text-red-500 fill-red-500"
                          : isActive
                          ? "text-white"
                          : "text-gray-400"
                      }
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HealthVideoSection;