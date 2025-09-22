const jwt = require('../middleware/authentication');
const controller = require('../controllers/hotsale.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/get/hotsale', controller.getHotSale);
    app.post('/api/create/hotsale',  controller.CreateHotSale);
    app.patch('/api/update/hotsale', jwt.verifyToken, controller.updateHotSale);
    app.delete('/api/delete/hotsale/:id', jwt.verifyToken, controller.DeleteHotsale);
}