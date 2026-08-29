const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

module.exports = (app) => {
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }));

    app.options("*", cors());

    app.use("/uploads", express.static("uploads"));
};


// const bodyParser = require("body-parser");
// const cors = require("cors");
// const express = require("express");

// module.exports = (app) => {
//     app.use(bodyParser.json());

//     app.use(bodyParser.urlencoded({
//         extended: true,
//     }));

//     app.use(cors({
//         origin: ["http://localhost:3000", "http://localhost:3001"],
//         methods: ["GET", "POST", "PATCH", "DELETE",],
//         credentials: true,
//     }));

//     app.use("/uploads", express.static("uploads"));
// };