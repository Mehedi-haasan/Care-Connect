// models/contentSection.model.js
module.exports = (sequelize, Sequelize) => {
  const ContentSection = sequelize.define("content", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // Active or inactive
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },

    // Order in the section
    sequence: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },

    // Section type: home, slider, featured
    section_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    // Category type (maternal_health, child_care, etc.)
    category_type: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    // Subcategory type
    sub_cate_type: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    description: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    },

    image_url: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    sku: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    // Optional content type relation
    content_type_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });

  // Associations (if you have categories or content_type tables)
  ContentSection.associate = (models) => {
    ContentSection.belongsTo(models.category, {
      foreignKey: "category_id",
      as: "category",
    });

    ContentSection.belongsTo(models.category, {
      foreignKey: "sub_cate_id",
      as: "subCategory",
    });

    ContentSection.belongsTo(models.content_type, {
      foreignKey: "content_type_id",
      as: "content_type",
    });
  };

  return ContentSection;
};
