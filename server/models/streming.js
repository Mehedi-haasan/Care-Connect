module.exports = (sequelize, Sequelize) => {
    const StrimData = sequelize.define("striming_data", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
        },
        name: {
            type: Sequelize.STRING,
        },
        quality: {
            type: Sequelize.STRING,
        },
        video_url: {
            type: Sequelize.STRING,
        }
    });

    return StrimData;
};