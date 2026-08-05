module.exports = (sequelize, Sequelize) => {
    const Hospital = sequelize.define("hospitals", {
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
        address: {
            type: Sequelize.STRING
        },
        doctor_ids: {
            type: Sequelize.JSON,
            allowNull: true,
            defaultValue: []
        },
        division_id:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        district_id:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        upazila_id:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        image_url: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });

    Hospital.associate = (models) => {
        Hospital.belongsTo(models.division, {
            foreignKey: "division_id",
            as: "division"
        });
        Hospital.belongsTo(models.distric, {
            foreignKey: "district_id",
            as: "district"
        });
        Hospital.belongsTo(models.upazila, {
            foreignKey: "upazila_id",
            as: "upazila"
        });

    };

    return Hospital;
};
