const jwt = require('../middleware/authentication')
const controller = require("../controllers/striming");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/upload/video", controller.CreateStrim);

    app.get("/api/get/videos", controller.GetStrim);

    app.get('/api/get/stream/:id', controller.StreamVideo);

};