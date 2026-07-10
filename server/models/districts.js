module.exports = (sequelize, Sequelize) => {
    const District = sequelize.define("districts", {
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
        division_id: {
            type: Sequelize.INTEGER,
        }
    });

    District.associate = (models) => {
        District.belongsTo(models.division, {
            foreignKey: "division_id",
            as: "division"
        });

        District.hasMany(models.upazila, {
            foreignKey: "district_id",
            as: "upazilas"
        });
    };

    return District;
};