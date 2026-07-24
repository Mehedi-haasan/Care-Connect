const jwt = require('../middleware/authentication')
const controller = require("../controllers/sub_category_controller");
const upload = require('../multer/Upload')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/create/sub/category", controller.CreateSubCategory);
    app.patch("/api/update/sub/category", controller.updateSubCategory);
    app.get("/api/get/sub/category/:page/:pageSize", controller.getSubCategory);

};
