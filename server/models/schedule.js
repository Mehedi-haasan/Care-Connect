module.exports = (sequelize, Sequelize) => {
    const Schedules = sequelize.define("schedules", {
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
        hospital_id: {
            type: Sequelize.INTEGER
        }
    });

    Schedules.associate = (models) => {
        Schedules.belongsTo(models.doctor_and_hospital, {
            foreignKey: "hospital_id",
            as: "hospital"
        });
    };

    return Schedules;
};