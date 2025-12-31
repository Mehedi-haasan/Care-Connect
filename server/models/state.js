module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("state", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        charge: {
            type: Sequelize.INTEGER,
        }
    });

    return State;
};