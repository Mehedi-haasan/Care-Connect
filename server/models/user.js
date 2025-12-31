module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        image_url: Sequelize.STRING,
        user_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        dept_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        address_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });

    User.associate = (models) => {
        // many2one → user_type
        User.belongsTo(models.usertype, {
            foreignKey: "user_type_id",
            as: "usertype"
        });
        User.belongsTo(models.department, {
            foreignKey: "dept_id",
            as: "department"
        });
        User.belongsTo(models.address, {
            foreignKey: "address_id",
            as: "address"
        });
        // one2many → user_role
        User.hasMany(models.user_role, {
            foreignKey: "user_id",
            as: "roles"
        });
    };

    return User;
};
