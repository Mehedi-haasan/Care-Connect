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
        type: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    });

    Specialties.associate = (models) => {
        Specialties.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "doctor"
        });
    };

    return Specialties;
};