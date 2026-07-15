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
        Category.hasMany(models.sub_category, {
            foreignKey: "cate_id",
            as: "sub_cates",
        });
    };

    return Category;
};
