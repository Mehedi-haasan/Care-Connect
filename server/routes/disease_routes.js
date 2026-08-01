const jwt = require('../middleware/authentication')
const controller = require("../controllers/disease_controller");
const upload = require('../multer/Upload')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/create/disease", controller.CreateDisease);
    app.patch("/api/update/disease", controller.UpdateDisease);
    app.get("/api/get/disease/:page/:pageSize", controller.GetDisease);

};
