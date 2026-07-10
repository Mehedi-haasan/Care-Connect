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
        dept_id: Sequelize.INTEGER,
        address_id: Sequelize.INTEGER
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
    };

    return User;
};
