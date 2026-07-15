module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image_url: {
            type: Sequelize.STRING,
        },
        parent_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    });

    Category.associate = (models) => {
<<<<<<< HEAD
        Category.hasMany(models.sub_category, {
            foreignKey: "cate_id",
            as: "sub_cates",
=======
        // Parent category (many categories belong to one parent)
        Category.belongsTo(models.category, {
            foreignKey: "parent_id",
            as: "parent",
        });

        // Child categories (one category has many children)
        Category.hasMany(models.category, {
            foreignKey: "parent_id",
            as: "children",
>>>>>>> master
        });
    };

    return Category;
};
