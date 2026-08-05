const jwt = require('../middleware/authentication');
const controller = require('../controllers/hospital_controllers')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/get/hospital', controller.GetHospital);
    app.get('/api/get/single/hospital/:id', controller.GetSingleHospital);
    app.post('/api/create/hospital', jwt.verifyToken, controller.CreateHospital);
    app.patch('/api/update/hospital', jwt.verifyToken, controller.updateHospital);
    app.delete('/api/delete/hospital/:id', jwt.verifyToken, controller.updateHospital);
}