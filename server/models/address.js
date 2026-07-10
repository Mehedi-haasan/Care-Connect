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
        User.belongsTo(models.division, {
            foreignKey: "division_id",
            as: "division"
        });
        User.belongsTo(models.district, {
            foreignKey: "district_id",
            as: "district"
        });
        User.belongsTo(models.division, {
            foreignKey: "upazila_id",
            as: "upazila"
        });
    };

    return Address;
};
