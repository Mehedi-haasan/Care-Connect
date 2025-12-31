module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("rating", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.INTEGER
        },
        product_id: {
            type: Sequelize.INTEGER
        },
        star:{
            type: Sequelize.INTEGER
        },
        comment:{
            type: Sequelize.STRING
        }
    });

    return Rating;
};
