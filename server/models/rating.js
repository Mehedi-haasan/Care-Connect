module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("rating", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
<<<<<<< HEAD
        receiver_id: {
            type: Sequelize.INTEGER
        },
        sender_id: {
=======
        userId: {
            type: Sequelize.INTEGER
        },
        product_id: {
>>>>>>> master
            type: Sequelize.INTEGER
        },
        star:{
            type: Sequelize.INTEGER
        },
        comment:{
            type: Sequelize.STRING
        }
    });
<<<<<<< HEAD
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
=======
>>>>>>> master

    return Rating;
};
