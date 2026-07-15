const jwt = require('../middleware/authentication')
// [jwt.verifyToken],
<<<<<<< HEAD
const controller = require("../controllers/division.controller");
=======
const controller = require("../controllers/state.controller");
>>>>>>> master

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

<<<<<<< HEAD
    app.post("/api/create/division", controller.CreateDivision);
    app.get("/api/get/division", controller.GetDivision);
=======
    app.post("/api/create/state", controller.CreateState);
    app.get("/api/get/state", controller.getState);
>>>>>>> master

};