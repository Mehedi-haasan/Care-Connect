const jwt = require('../middleware/authentication');
const controller = require('../controllers/rating.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    // app.get('/api/get/carousel', controller.getCarousel);
    app.post('/api/create/rating', jwt.verifyToken, controller.CreateRating);
    app.patch('/api/update/rating', jwt.verifyToken, controller.updateRating);
    app.delete('/api/delete/rating/:id', jwt.verifyToken, controller.DeleteRating);
}