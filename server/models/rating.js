module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("rating", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        receiver_id: {
            type: Sequelize.INTEGER
        },
        sender_id: {
            type: Sequelize.INTEGER
        },
        star:{
            type: Sequelize.INTEGER
        },
        comment:{
            type: Sequelize.STRING
        }
    });
    Rating.associate = (models) => {
        // many2one → user
        Rating.belongsTo(models.user, {
            foreignKey: "receiver_id",
            as: "receiver"
        });
        Rating.belongsTo(models.user, {
            foreignKey: "sender_id",
            as: "sender"
        });
    };

    return Rating;
};
