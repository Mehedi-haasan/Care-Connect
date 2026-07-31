const jwt = require('../middleware/authentication');
const controller = require('../controllers/appoinment_controllers')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/get/apoinment', controller.GetAppoinment);
    app.post('/api/create/apoinment', jwt.verifyToken, controller.CreateAppoinment);
    app.patch('/api/update/apoinment', jwt.verifyToken, controller.UpdateAppoinment);
    app.delete('/api/delete/apoinment/:id', jwt.verifyToken, controller.DeleteAppoinment);
}