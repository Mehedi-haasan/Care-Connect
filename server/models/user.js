module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
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
        phone: {
            type: Sequelize.STRING
        },
        user_type: {
            type: Sequelize.STRING
        },
        date_of_birth: {
            type: Sequelize.STRING
        },
        personal_email: {
            type: Sequelize.STRING
        },
        designation: {
            type: Sequelize.STRING
        },
        degree_name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        image_url: {
            type: Sequelize.STRING
        },
        dept_id: {
            type: Sequelize.INTEGER
        },
        hospital_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    });
    User.associate = (models) => {
        User.hasMany(models.role, {
            foreignKey: "user_id",
            as: "roles"
        });
        User.hasMany(models.degree, {
            foreignKey: "user_id",
            as: "degrees"
        });
        User.hasMany(models.address, {
            foreignKey: "user_id",
            as: "address"
        });
        User.belongsTo(models.department, {
            foreignKey: "dept_id",
            as: "department"
        });
        User.belongsTo(models.hospital, {
            foreignKey: "hospital_id",
            as: "hospital"
        });
        User.hasMany(models.specialtie, {
            foreignKey: "user_id",
            as: "specialties"
        });
        User.hasMany(models.doctor_and_hospital, {
            foreignKey: "doctor_id",
            as: "hospitals"
        });
    };

    return User;
};
