module.exports = (sequelize, Sequelize) => {
    const Degrees = sequelize.define("degrees", {
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
        major: {
            type: Sequelize.STRING
        },
        institute: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    });

    Degrees.associate = (models) => {
        // many2one → user
        Degrees.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user"
        });
    };

    return Degrees;
};