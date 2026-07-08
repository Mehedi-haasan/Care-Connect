module.exports = (app) => {
  const video = require("../controllers/video.controller");
  const upload = require("../middleware/upload");

  const router = require("express").Router();

  // ================= GET =================
  router.get("/", video.getAllVideos);

  // ================= UPLOAD =================
  router.post(
    "/upload",
    upload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    video.uploadVideo
  );

  // ================= DELETE =================
  router.delete("/:id", video.deleteVideo);

  app.use("/video", router);
};