module.exports = (sequelize, Sequelize) => {
    const DoctorHospital = sequelize.define("doctor_and_hospital", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
        },
        doctor_id: {
            type: Sequelize.INTEGER
        },
        hospital_id: {
            type: Sequelize.INTEGER
        },
        time:{
            type: Sequelize.STRING 
        }
    });

    DoctorHospital.associate = (models) => {
        DoctorHospital.belongsTo(models.user, {
            foreignKey: "doctor_id",
            as: "doctor"
        });
        DoctorHospital.belongsTo(models.hospital, {
            foreignKey: "hospital_id",
            as: "hospital"
        });
        DoctorHospital.hasMany(models.schedule, {
            foreignKey: "hospital_id",
            as: "schedules"
        });
    };

    return DoctorHospital;
};