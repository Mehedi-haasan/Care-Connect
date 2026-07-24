const jwt = require('../middleware/authentication')
// [jwt.verifyToken],
const controller = require("../controllers/degree_controllers");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/create/degree", controller.CreateDegree);
    app.get("/api/get/degree", controller.DeleteDegree);
};