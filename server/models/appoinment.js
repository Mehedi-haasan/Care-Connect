module.exports = (sequelize, Sequelize) => {
    const Appoinment = sequelize.define("appoinment", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN
        },
        name: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        emergency_number: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        running_medecine: {
            type: Sequelize.STRING
        },
        allergic_food: {
            type: Sequelize.STRING
        },
        previous_surgery_or_serious_illness: {
            type: Sequelize.STRING
        },
        appoinment_date: {
            type: Sequelize.STRING
        },
        appoinment_time: {
            type: Sequelize.TIME
        },
        new_patient: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        patient_age: {
            type: Sequelize.INTEGER,
        },
        prev_history: {
            type: Sequelize.STRING
        },
        consultation_type: {
            type: Sequelize.STRING,
            defaultValue: "in_person"
        },
        duration: {
            type: Sequelize.INTEGER // minutes
        },
        is_emergency: {
            type: Sequelize.BOOLEAN
        },
        image_url: {
            type: Sequelize.STRING
        },
        reason_for_visit: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.STRING
        },
        attachment: {
            type: Sequelize.STRING
        },
        doctor_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        patient_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        payment_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        hospital_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    });
    Appoinment.associate = (models) => {
        Appoinment.belongsTo(models.user, {
            foreignKey: "doctor_id",
            as: "doctor"
        });
        Appoinment.belongsTo(models.user, {
            foreignKey: "patient_id",
            as: "patient"
        });
        Appoinment.belongsTo(models.payment, {
            foreignKey: "payment_id",
            as: "payment"
        });
    };

    return Appoinment;
};
