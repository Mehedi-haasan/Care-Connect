const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ================= CREATE FOLDERS IF NOT EXIST =================
const makeDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

makeDir("uploads");
makeDir("uploads/images");
makeDir("uploads/videos");
makeDir("uploads/thumbnails");

// ================= STORAGE =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "uploads/images/");
    } else if (file.fieldname === "video") {
      cb(null, "uploads/videos/");
    } else if (file.fieldname === "thumbnail") {
      cb(null, "uploads/thumbnails/");
    } else {
      cb(null, "uploads/");
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// ================= FILE FILTER =================
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image" || file.fieldname === "thumbnail") {
    // Accept images
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  } else if (file.fieldname === "video") {
    // Accept videos
    if (
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/mkv" ||
      file.mimetype === "video/quicktime"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"), false);
    }
  } else {
    cb(null, true);
  }
};

// ================= LIMIT =================
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB (video safe)
  },
});

module.exports = upload;