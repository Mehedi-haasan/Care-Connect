module.exports = (sequelize, Sequelize) => {
    const Upazila = sequelize.define("upazilas", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN
        },
        name: {
            type: Sequelize.STRING,
        },
        district_id: {
            type: Sequelize.INTEGER,
        }
    });
    Upazila.associate = (models) => {
        Upazila.belongsTo(models.distric, {
            foreignKey: "district_id",
            as: "district"
        });
    };
    return Upazila;
};