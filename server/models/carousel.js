module.exports = (sequelize, Sequelize) => {
    const Carousel = sequelize.define("carousel", {
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
        }
    });

    return Carousel;
};
