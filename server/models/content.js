module.exports = (sequelize, Sequelize) => {
    const Content = sequelize.define("content", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
        },
        sequence: {
            type: Sequelize.INTEGER,
        },
        category_id: {
            type: Sequelize.INTEGER,
        },
        sub_cate_id: {
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.TEXT
        },
        description: {
            type: Sequelize.TEXT
        },
        image_url: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        standard_price: {
            type: Sequelize.INTEGER
        },
        sku: {
            type: Sequelize.STRING
        },
        type_id: {
            type: Sequelize.INTEGER,
        },
        creator_id: {
            type: Sequelize.INTEGER,
        },
    });

    Content.associate = (models) => {
        // many2one → user_type
        Content.belongsTo(models.category, {
            foreignKey: "category_id",
            as: "category"
        });
        Content.belongsTo(models.sub_category, {
            foreignKey: "sub_cate_id",
            as: "sub_category"
        });

        Content.belongsTo(models.content_type, {
            foreignKey: "type_id",
            as: "type"
        });
        Content.belongsTo(models.user, {
            foreignKey: "creator_id",
            as: "creator"
        });
    };

    return Content;
};

