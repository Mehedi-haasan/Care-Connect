module.exports = (sequelize, Sequelize) => {
    const ProductProduct = sequelize.define("product_product", {
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
        price: {
            type: Sequelize.INTEGER
        },
        standard_price: {
            type: Sequelize.INTEGER
        },
        sku: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        category_id: {
            type: Sequelize.INTEGER,
        },
        template_id: {
            type: Sequelize.INTEGER,
        },
        product_type: {
            type: Sequelize.BOOLEAN,
        }
    });

        ProductProduct.associate = function (models) {
            ProductProduct.belongsTo(models.productTemplate, {
                foreignKey: 'template_id',
                onDelete: 'CASCADE',
            });

        // Product.hasMany(models.productVariantAttributeValue, {
        //     foreignKey: 'productId',
        //     as: 'variantAttributeValues',
        //     onDelete: 'CASCADE',
        // });
        // Product.hasMany(models.productCustomFields, {
        //     foreignKey: 'productId',
        //     as: 'customFields',
        //     onDelete: 'CASCADE',
        // });
        // Product.hasMany(models.productRatings, {
        //     foreignKey: 'productId',
        //     as: 'ratings',
        //     onDelete: 'CASCADE',
        // });
        // Product.hasMany(models.saleOrderLine, {
        //     foreignKey: 'productId',
        //     as: 'saleOrderLines',
        //     onDelete: 'RESTRICT',
        // });
    }

    return ProductProduct;
};
