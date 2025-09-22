const jwt = require('../middleware/authentication');
const controller = require('../controllers/carousel.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/get/carousel', controller.getCarousel);
    app.post('/api/create/carousel', jwt.verifyToken, controller.CreateCarousel);
    app.patch('/api/update/carousel', jwt.verifyToken, controller.updateCarousel);
    app.delete('/api/delete/carousel/:id', jwt.verifyToken, controller.DeleteCarousel);
}