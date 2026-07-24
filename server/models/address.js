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
        user_id: {
            type: Sequelize.INTEGER
        },
        address_type: {
            type: Sequelize.STRING
        },
        division_id: {
            type: Sequelize.INTEGER
        },
        district_id: {
            type: Sequelize.INTEGER
        },
        upazila_id: {
            type: Sequelize.INTEGER
        }
    });
    Address.associate = (models) => {
        // many2one → user_type
        Address.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user"
        });
        Address.belongsTo(models.division, {
            foreignKey: "division_id",
            as: "division"
        });
        Address.belongsTo(models.distric, {
            foreignKey: "district_id",
            as: "district"
        });
        Address.belongsTo(models.upazila, {
            foreignKey: "upazila_id",
            as: "upazila"
        });
    };

    return Address;
};
