module.exports = (sequelize, Sequelize) => {
    const UserType = sequelize.define("usertypes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return UserType;
};
