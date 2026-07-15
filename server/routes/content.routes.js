<<<<<<< HEAD
const jwt = require('../middleware/authentication');
const controller = require('../controllers/content.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/get/content', controller.GetContent);
    app.post('/api/create/content', controller.CreateContent);
}
=======
const controller = require("../controllers/content.controller");
const upload = require("../multer/Upload");
module.exports = function (app) {
  // ✅ CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

  app.options("*", (req, res) => res.sendStatus(200)); // preflight

  // CRUD routes
  
  app.get("/api/get/content", controller.GetContent);
  app.get("/api/get/content/:id", controller.GetContentById);
  app.post("/api/create/content", controller.CreateContent);
  
  app.put("/api/update/content/:id", upload.single("image"), controller.UpdateContent);
  app.delete("/api/delete/content/:id", controller.DeleteContent);
};
>>>>>>> master
