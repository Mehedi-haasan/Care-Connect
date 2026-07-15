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
db.department = require("./department")(sequelize, Sequelize);
db.role = require("./role")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);
db.sub_category = require("./sub_category")(sequelize, Sequelize);
db.content = require("./content")(sequelize, Sequelize);
db.content_type = require("./content_type")(sequelize, Sequelize);
db.division = require("./divisions")(sequelize, Sequelize);
db.distric = require("./districts")(sequelize, Sequelize);
db.upazila = require("./upazila")(sequelize, Sequelize);
db.company = require("./company")(sequelize, Sequelize);
db.carousel = require("./carousel")(sequelize, Sequelize);
db.message = require("./message")(sequelize, Sequelize);
db.striming_data = require("./streming")(sequelize, Sequelize);
db.rating = require("./rating")(sequelize, Sequelize);
db.address = require("./address")(sequelize, Sequelize);
db.specialtie = require("./specialties")(sequelize, Sequelize);
db.degree = require("./degrees")(sequelize, Sequelize);
db.disease = require("./disease")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
      db[modelName].associate(db);
  }
});

module.exports = db;