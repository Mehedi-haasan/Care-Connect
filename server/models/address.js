module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
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
        image_url: {
            type: Sequelize.STRING
        },
        state_id: {
            type: Sequelize.INTEGER
        }
    });
    Address.associate = (models) => {
        // many2one → user_type
        User.belongsTo(models.state, {
            foreignKey: "state_id",
            as: "state"
        });
    };

    return Address;
};
