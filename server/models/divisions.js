module.exports = (sequelize, Sequelize) => {
    const Division = sequelize.define("divisions", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        charge: {
            type: Sequelize.INTEGER,
        }
    });

    Division.associate = (models) => {
        Division.hasMany(models.district, {
            foreignKey: "division_id",
            as: "divisions"
        });
    };

    return Division;
};