const controller = require("../controllers/contentSection.controller");
const upload = require("../multer/Upload");

module.exports = function (app) {
  /* ======================= CORS ======================== */
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.options("*", (req, res) => res.sendStatus(200));

  // ===== ADMIN ROUTES =====
  app.get("/api/admin/content-section", controller.GetContentSectionsAdmin); // all active + inactive
  app.put("/api/admin/content-section/update/:id", controller.UpdateContentSection); // update content + active + position
  app.post("/api/admin/content-section/update-sequence", controller.UpdateSequence); // update sequence
  app.delete("/api/admin/content-section/delete/:id", controller.DeleteContentSection);

  // ===== CLIENT ROUTES =====
  app.get("/api/content-section", controller.GetContentSectionsClient); // only active
};
