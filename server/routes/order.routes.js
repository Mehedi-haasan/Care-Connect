const jwt = require('../middleware/authentication');
const controller = require('../controllers/order.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/get/order', jwt.verifyToken, controller.getOrder);
    app.get('/api/get/user/order',jwt.verifyToken, controller.getUserOrder);
    app.get('/api/get/user/order/:tran_id',jwt.verifyToken, controller.getInstantOrder);
    // app.post('/api/create/carousel', jwt.verifyToken, controller.CreateCarousel);
    // app.patch('/api/update/carousel', jwt.verifyToken, controller.updateCarousel);
    // app.delete('/api/delete/carousel/:id', jwt.verifyToken, controller.DeleteCarousel);
}