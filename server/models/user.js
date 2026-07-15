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
        user_type: {
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
        address_id: {
            type: Sequelize.INTEGER
        }
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
        User.belongsTo(models.address, {
            foreignKey: "address_id",
            as: "address"
        });
        User.belongsTo(models.department, {
            foreignKey: "dept_id",
            as: "department"
        });
    };

    return User;
};
