module.exports = (sequelize, Sequelize) => {
    const coupon = sequelize.define("coupon", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
        },
        name: {
            type: Sequelize.STRING,
        },
        couponType: {
            type: Sequelize.STRING,
        },
        discount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        startDate: {
            type: Sequelize.DATE,
        },
        endDate: {
            type: Sequelize.DATE,
        }

    });
    return coupon;
};
