module.exports = (sequelize, Sequelize) => {
    const saleorder = sequelize.define("saleorder", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        product_id: {
            type: Sequelize.INTEGER,
        },
        template_id: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        charge: {
            type: Sequelize.INTEGER
        },
        qty: {
            type: Sequelize.INTEGER,
        },
        tran_id:{
            type: Sequelize.STRING
        },
        coupon: {
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        paymentstatus: {
            type: Sequelize.STRING
        },
    });

    return saleorder;
};
