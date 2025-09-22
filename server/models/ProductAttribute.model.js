module.exports = (sequelize, Sequelize) => {
    const ProductVariantAttributeValue = sequelize.define("attribute", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
        },
        variant_id: {
            type: Sequelize.INTEGER,
        },
        templete_id: {
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
        value: {
            type: Sequelize.STRING
        },
    });

    ProductVariantAttributeValue.associate = function (models) {
        ProductVariantAttributeValue.belongsTo(models.ProductVariant, {
            foreignKey: 'variant_id',
            onDelete: 'CASCADE',
        });

   
}

    return ProductVariantAttributeValue;
}