module.exports = (sequelize, Sequelize) => {
    const Disease = sequelize.define("disease", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
        },
        name: {
            type: Sequelize.STRING
        },
        image_url: {
            type: Sequelize.STRING
        },
        cate_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        sub_cate_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    });

    Disease.associate = (models) => {
        Disease.belongsTo(models.category, {
            foreignKey: "cate_id",
            as: "category",
        });
        Disease.belongsTo(models.sub_category, {
            foreignKey: "sub_cate_id",
            as: "sub_category",
        });
    };

    return Disease;
};
