const jwt = require('../middleware/authentication');
const controller = require('../controllers/content.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/get/content', controller.GetContent);
    app.get('/api/get/content/:cat_id', controller.GetContentCategoryWise);
    app.get('/api/get/single/content/:id', controller.GetSingleContent);
    app.get('/api/get/content/common/data', controller.GetCommonContent);
    app.post('/api/create/content', controller.CreateContent);
    app.patch('/api/update/content', controller.UpdateContent);
}
