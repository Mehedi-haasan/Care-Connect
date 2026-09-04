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
        phone: {
            type: Sequelize.BOOLEAN,
        },
        physical: {
            type: Sequelize.BOOLEAN,
        },
        video: {
            type: Sequelize.BOOLEAN,
        },
        doctor_id: {
            type: Sequelize.INTEGER
        },
        hospital_id: {
            type: Sequelize.INTEGER
        },
        time: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        new_visit_fee: {
            type: Sequelize.INTEGER
        },
        follow_up_fee: {
            type: Sequelize.INTEGER
        },
        report_see_fee: {
            type: Sequelize.INTEGER
        },
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
            foreignKey: "chamber_id",
            as: "schedules"
        });
    };

    return DoctorHospital;
};