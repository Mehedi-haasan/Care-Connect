const jwt = require('../middleware/authentication');
const controller = require('../controllers/content_type_controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/get/content/type/:page/:pagrSize', controller.GetContentType);
    app.get('/api/get/single/content/type/:id', controller.GetSingleContentType);
    app.post('/api/create/content/type', controller.CreateContentType);
    app.patch('/api/update/content/type', controller.UpdateContentType);
}
