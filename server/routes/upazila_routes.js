const jwt = require('../middleware/authentication')
// [jwt.verifyToken],
const controller = require("../controllers/upazila_controllers");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/create/upazila", controller.CreateUpazila);
    app.get("/api/get/upazila", controller.DeleteUpazila);


};