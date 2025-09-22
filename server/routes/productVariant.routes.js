const jwt = require('../middleware/authentication')
const upload = require('../multer/Upload')
// [jwt.verifyToken],
const controller = require("../controllers/productVariant.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/update/variant", upload.single('image_url'), controller.UpdateVariant);
    // app.get("/api/get/state", controller.getState);

};