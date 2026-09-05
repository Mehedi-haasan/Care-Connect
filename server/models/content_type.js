module.exports = (sequelize, Sequelize) => {
    const ContentType = sequelize.define("content_type", {
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
        }
    });

    ContentType.associate = (models) => {
        // many2one → user_type
        ContentType.hasMany(models.content, {
            foreignKey: "type_id",
            as: "contents"
        });
    };


    return ContentType;
};

