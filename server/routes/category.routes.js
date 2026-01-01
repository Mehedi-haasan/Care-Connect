const jwt = require('../middleware/authentication')
const controller = require("../controllers/category.controller");
const upload = require('../multer/Upload')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/create/category", controller.CreateCategory);
    app.get("/api/get/category", controller.getCategory);

};