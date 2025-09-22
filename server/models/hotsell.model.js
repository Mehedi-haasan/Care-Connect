module.exports = (sequelize, Sequelize) => {
    const hotsale = sequelize.define("hotsale", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
        },
        template_id:{
            type: Sequelize.INTEGER,
        }
    });

    return hotsale;
};
