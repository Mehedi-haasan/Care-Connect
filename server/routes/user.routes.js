const jwt = require('../middleware/authentication')
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/auth/signin", controller.singIn);

    app.post("/api/auth/signup", controller.singUp);

    app.get("/api/get/users/with/role/:page/:pageSize", controller.getUsers);

    app.get("/api/get/single/users/:id", controller.getSingleUsers);

    app.patch("/api/update/single/user", controller.updateUsers);

};