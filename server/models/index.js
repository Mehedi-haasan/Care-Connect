const config = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    logging: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.usertype = require("./usertype")(sequelize, Sequelize);
db.department = require("./department")(sequelize, Sequelize);
db.role = require("./role")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);
db.content = require("./content")(sequelize, Sequelize);
db.state = require("./state")(sequelize, Sequelize);
db.company = require("./company")(sequelize, Sequelize);
db.carousel = require("./carousel")(sequelize, Sequelize);
db.message = require("./message")(sequelize, Sequelize);
db.video = require("./video")(sequelize, Sequelize);



module.exports = db;