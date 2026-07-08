const db = require("../models");
const Video = db.video;

// ================= GET ALL =================
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      order: [["id", "DESC"]],
    });

    res.send(videos);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error retrieving videos",
    });
  }
};

// ================= UPLOAD =================
exports.uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;

    // SAFE ACCESS
    const videoFile = req.files && req.files.video ? req.files.video[0] : null;
    const thumbFile = req.files && req.files.thumbnail ? req.files.thumbnail[0] : null;

    if (!title || !videoFile) {
      return res.status(400).send({
        message: "Title and video are required",
      });
    }

    const video = await Video.create({
      title,
      video_url: `/uploads/videos/${videoFile.filename}`,
      thumbnail_url: thumbFile
        ? `/uploads/thumbnails/${thumbFile.filename}`
        : null,
    });

    res.send(video);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Upload failed",
    });
  }
};

// ================= DELETE =================
exports.deleteVideo = async (req, res) => {
  try {
    const id = req.params.id;

    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).send({
        message: "Video not found",
      });
    }

    await video.destroy();

    res.send({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Delete failed",
    });
  }
};