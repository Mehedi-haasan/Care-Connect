const jwt = require('../middleware/authentication')
// [jwt.verifyToken],
const controller = require("../controllers/district_controllers");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/create/districts", controller.CreateDistrict);
    app.get("/api/get/districts", controller.GetDistrict);
    app.get("/api/get/just/districts", controller.GetJustDistrict);

};