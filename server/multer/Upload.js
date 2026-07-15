<<<<<<< HEAD
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

// Initialize upload
const upload = multer({
    storage: storage,
    // limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    // fileFilter: fileFilter
});

module.exports = upload;



=======
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload directory
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});

// File filter: only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) return cb(null, true);
  cb(new Error("Only images are allowed"));
};

// Multer configuration for large uploads
const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024,   // 200 MB max image
    fieldSize: 100 * 1024 * 1024,   // 100 MB max per form field (description etc.)
  },
  fileFilter,
});

module.exports = upload;
>>>>>>> master
