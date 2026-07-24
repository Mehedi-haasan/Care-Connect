const jwt = require('../middleware/authentication');
const controller = require('../controllers/address_controllers')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/get/address', controller.GetAddress);
    app.post('/api/create/address', jwt.verifyToken, controller.CreateAddress);
    app.patch('/api/update/address', jwt.verifyToken, controller.UpdateAddress);
    app.delete('/api/delete/address/:id', jwt.verifyToken, controller.DeleteAddress);
}