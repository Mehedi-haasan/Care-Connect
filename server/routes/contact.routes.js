const jwt = require('../middleware/authentication');
const controller = require('../controllers/contact.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/get/contact', controller.getMessage);
    app.post('/api/create/contact', jwt.verifyToken, controller.CreateMessage);
}