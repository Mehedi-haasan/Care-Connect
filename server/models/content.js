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
        content_type_id: {
            type: Sequelize.BOOLEAN,
        },
    });

    Content.associate = (models) => {
        // many2one → user_type
        Content.belongsTo(models.category, {
            foreignKey: "category_id",
            as: "category"
        });
        Content.belongsTo(models.category, {
            foreignKey: "sub_cate_id",
            as: "category"
        });

        // one2many → user_role
        Content.belongsTo(models.content_type, {
            foreignKey: "content_type_id",
            as: "content_type"
        });
    };

    return Content;
};

