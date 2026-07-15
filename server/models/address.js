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
<<<<<<< HEAD
        division_id: {
            type: Sequelize.INTEGER
        },
        district_id: {
            type: Sequelize.INTEGER
        },
        upazila_id: {
=======
        state_id: {
>>>>>>> master
            type: Sequelize.INTEGER
        }
    });
    Address.associate = (models) => {
        // many2one → user_type
<<<<<<< HEAD
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
=======
        User.belongsTo(models.state, {
            foreignKey: "state_id",
            as: "state"
>>>>>>> master
        });
    };

    return Address;
};
