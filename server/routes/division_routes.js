const jwt = require('../middleware/authentication')
// [jwt.verifyToken],
const controller = require("../controllers/division.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/create/division", controller.CreateDivision);
    app.get("/api/get/division", controller.GetDivision);
    app.get("/api/get/just/division", controller.GetJustDivision);
    app.get("/api/get/common/state", controller.GetCommonState);

};