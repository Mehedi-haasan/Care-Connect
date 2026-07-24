const express = require('express');
const app = express();
const port = 8050;

const http = require('http');
const server = http.createServer(app);
require("./socket/socket")(server);
require("./middleware/index")(app);
// require("./models/db_init")();


require('./routes/user.routes')(app);
require('./routes/division_routes')(app);
require('./routes/districts_routes')(app);
require('./routes/upazila_routes')(app);
require('./routes/category.routes')(app);
require('./routes/sub_category')(app);
require('./routes/company.routes')(app);
require('./routes/imageupload.routes')(app);
require('./routes/striming')(app)
require('./routes/carousel.routes')(app);
require('./routes/rating.routes')(app);
require('./routes/payment.routes')(app);
require('./routes/message.routes')(app);
require('./routes/content.routes')(app);
require('./routes/content_type')(app);
require('./routes/department.routes')(app);
require('./routes/address_routes')(app);
require('./routes/degrees_routes')(app);



server.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
});
