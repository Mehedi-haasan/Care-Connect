module.exports = (sequelize, Sequelize) => {
    const saleorderlines = sequelize.define("saleorderlines", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
        },
        product_id:{
            type: Sequelize.INTEGER,
        },
        qty:{
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER
        },
    });

    return saleorderlines;
};
