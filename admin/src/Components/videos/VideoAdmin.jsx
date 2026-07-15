import { useEffect, useRef, useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import BASEURL from "../URL/baseurl"

const api = axios.create({
  baseURL: BASEURL,
});

export default function VideoAdmin() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [openUpload, setOpenUpload] = useState(false);
  const [editVideo, setEditVideo] = useState(null);

  // Upload state
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);

  // ================= FETCH =================
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/video");
      setVideos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ================= UPLOAD =================
  const uploadVideo = async () => {
    if (!title || !videoFile) {
      return alert("Title and video required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", videoFile);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await api.post("/video/upload", formData);

      setTitle("");
      setVideoFile(null);
      setThumbnail(null);
      setVideoPreview(null);
      setThumbPreview(null);

      setOpenUpload(false);
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // ================= DELETE =================
  const deleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await api.delete(`/video/${id}`);
      fetchVideos();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FILTER =================
  const filtered = videos.filter((v) =>
    v?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎬 Video Studio</h1>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2 text-gray-400" size={16} />
            <input
              className="border pl-8 pr-2 py-2 rounded"
              placeholder="Search video..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => setOpenUpload(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <Plus size={16} /> Upload
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && <p className="text-center">Loading...</p>}

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-500">No videos found</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((v) => (
          <VideoCard
            key={v.id}
            video={v}
            onDelete={() => deleteVideo(v.id)}
          />
        ))}
      </div>

      {/* ================= UPLOAD MODAL ================= */}
      {openUpload && (
        <Modal title="Upload Video" onClose={() => setOpenUpload(false)}>

          <input
            className="w-full border p-2 mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {videoPreview && (
            <video src={videoPreview} controls className="w-full mb-2" />
          )}

          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setVideoFile(file);
              setVideoPreview(URL.createObjectURL(file));
            }}
          />

          {thumbPreview && (
            <img src={thumbPreview} className="w-full h-32 mt-2 object-cover" />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setThumbnail(file);
              setThumbPreview(URL.createObjectURL(file));
            }}
          />

          <button
            onClick={uploadVideo}
            className="w-full mt-3 bg-purple-600 text-white py-2 rounded"
          >
            Upload
          </button>

        </Modal>
      )}
    </div>
  );
}

/* ================= VIDEO CARD ================= */
function VideoCard({ video, onDelete }) {
  const ref = useRef(null);

  const videoUrl = video?.video_url
  ? `${BASEURL}${video.video_url}`
  : "";
  const thumbUrl = video?.thumbnail_url
    ? `${BASEURL}${video.thumbnail_url}`
    : "";

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div
        className="h-40 bg-black relative group"
        onMouseEnter={() => ref.current?.play()}
        onMouseLeave={() => {
          if (ref.current) {
            ref.current.pause();
            ref.current.currentTime = 0;
          }
        }}
      >
        {/* THUMB */}
        {thumbUrl && (
          <img
            src={thumbUrl}
            className="absolute w-full h-full object-cover group-hover:opacity-0 transition"
          />
        )}

        {/* VIDEO */}
        {videoUrl && (
          <video
            ref={ref}
            src={videoUrl}
            className="w-full h-full object-cover"
            muted
          />
        )}
      </div>

      <div className="p-3">
        <h2 className="font-semibold text-sm">
          {video?.title || "Untitled"}
        </h2>

        <button
          onClick={onDelete}
          className="mt-2 w-full bg-red-500 text-white py-1 text-xs rounded flex items-center justify-center gap-1"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
}

/* ================= MODAL ================= */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white w-[400px] p-4 rounded-xl">
        <div className="flex justify-between mb-3">
          <h2 className="font-bold">{title}</h2>
          <button onClick={onClose}>✖</button>
        </div>
        {children}
      </div>
    </div>
  );
}