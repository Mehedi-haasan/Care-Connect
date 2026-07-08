module.exports = (sequelize, Sequelize) => {
    const District = sequelize.define("districts", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active:{
            type:Sequelize.BOOLEAN
        },
        name: {
            type: Sequelize.STRING,
        },
        divition_id: {
            type: Sequelize.INTEGER,
        }
    });

    return District;
};