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

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.productCategory = require("./productCategory.model")(sequelize, Sequelize);
db.productTemplete = require("./productTemplete.model")(sequelize, Sequelize);
db.productVariant = require("./productVariant.model")(sequelize, Sequelize);
db.ProductAttribute = require("./ProductAttribute.model")(sequelize, Sequelize);
db.hotsale = require("./hotsell.model")(sequelize, Sequelize);
db.saleorderlines = require("./saleorderline.model")(sequelize, Sequelize);
db.saleorder = require("./saleorder.model")(sequelize, Sequelize);
db.state = require("./state.model")(sequelize, Sequelize);
db.coupon = require("./coupon.model")(sequelize, Sequelize);
db.company = require("./company.model")(sequelize, Sequelize);
db.carousel = require("./carousel.model")(sequelize, Sequelize);
db.rating = require("./rating.model")(sequelize, Sequelize);
db.message = require("./message.model")(sequelize, Sequelize);

// relation between tables
db.productTemplete.hasMany(db.productVariant,{
  foreignKey:"template_id"
})
db.productVariant.belongsTo(db.productTemplete,{
  foreignKey:"template_id"
})


db.productVariant.hasMany(db.ProductAttribute,{
  foreignKey:"variant_id"
})
db.ProductAttribute.belongsTo(db.productVariant,{
  foreignKey:"variant_id"
})

// Category
db.productCategory.hasMany(db.productTemplete,{
  foreignKey:"category_id"
})
db.productTemplete.belongsTo(db.productCategory,{
  foreignKey:"category_id"
})




// Sale Order line
db.productVariant.hasMany(db.saleorderlines,{
  foreignKey:"product_id",
  onDelete: 'CASCADE',
})
db.saleorderlines.belongsTo(db.productVariant,{
  foreignKey:"product_id",
  onDelete: 'CASCADE',
})

db.user.hasMany(db.saleorderlines,{
  foreignKey:"userId",
  onDelete: 'CASCADE',
})
db.saleorderlines.belongsTo(db.user,{
  foreignKey:"userId",
  onDelete: 'CASCADE',
})



// Sale Order

db.productVariant.hasMany(db.saleorder,{
  foreignKey:"product_id",
  onDelete: 'CASCADE',
})
db.saleorder.belongsTo(db.productVariant,{
  foreignKey:"product_id",
  onDelete: 'CASCADE',
})

db.user.hasMany(db.saleorder,{
  foreignKey:"userId",
  onDelete: 'CASCADE',
})
db.saleorder.belongsTo(db.user,{
  foreignKey:"userId",
  onDelete: 'CASCADE',
})


db.user.hasMany(db.rating,{
  foreignKey:"userId",
  onDelete: 'CASCADE',
})
db.rating.belongsTo(db.user,{
  foreignKey:"userId",
  onDelete: 'CASCADE',
})


db.productVariant.hasMany(db.rating,{
  foreignKey:"product_id",
  onDelete: 'CASCADE',
})
db.rating.belongsTo(db.productVariant,{
  foreignKey:"product_id",
  onDelete: 'CASCADE',
})



db.productTemplete.hasMany(db.hotsale,{
  foreignKey:"template_id"
})
db.hotsale.belongsTo(db.productTemplete,{
  foreignKey:"template_id"
})


db.user.hasMany(db.message,{
  foreignKey:"senderId",
  onDelete: 'CASCADE',
})
db.message.belongsTo(db.user,{
  foreignKey:"senderId",
  onDelete: 'CASCADE',
})


db.user.hasMany(db.message,{
  foreignKey:"recieverId",
  onDelete: 'CASCADE',
})
db.message.belongsTo(db.user,{
  foreignKey:"recieverId",
  onDelete: 'CASCADE',
})




module.exports = db;