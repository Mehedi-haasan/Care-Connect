module.exports = (sequelize, Sequelize) => {
    const Disease = sequelize.define("disease", {
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

    return Disease;
};
