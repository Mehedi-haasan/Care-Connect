module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        }
    });
    Role.associate = (models) => {
        // many2one → user
        User.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user"
        });
    };

    return Role;
};