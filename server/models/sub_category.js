module.exports = (sequelize, Sequelize) => {
    const SubCategory = sequelize.define("sub_category", {
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
        cate_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    });

    SubCategory.associate = (models) => {
        SubCategory.belongsTo(models.category, {
            foreignKey: "cate_id",
            as: "category",
        });
    };

    return Category;
};
