module.exports = (sequelize, Sequelize) => {
    const Specialties = sequelize.define("specialties", {
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
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    });

    return Specialties;
};