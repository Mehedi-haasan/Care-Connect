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
        }
    });


    return ContentType;
};

