const Jwt = require("../middleware/authentication");

const controller = require("../controllers/saleorderline.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/product/add/to/cart", Jwt.verifyToken, controller.getCartProduct);
    app.get("/api/product/order", Jwt.verifyToken, controller.getOrder);
    app.get("/api/product/single/order/:id", Jwt.verifyToken, controller.SingleOrder);
    app.get("/api/product/user/order", Jwt.verifyToken, controller.userOrder);
    app.patch("/api/product/order/update", Jwt.verifyToken, controller.updateOrder);
    app.post("/api/product/add/to/cart", Jwt.verifyToken, controller.AddToCart);
    app.post("/api/product/place/order", Jwt.verifyToken, controller.PlaceOrder);
    app.delete("/api/product/add/to/cart/:id", Jwt.verifyToken, controller.DeleteCartItem);

};