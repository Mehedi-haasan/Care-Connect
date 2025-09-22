const db = require("../models");
const { Sequelize } = require('sequelize');
const config = require("../config/db.config");
const ProductTemplate = db.productTemplete;
const ProductVariant = db.productVariant;
const ProductAttribute = db.ProductAttribute;
const SaleOrderLine = db.saleorderlines;
const SaleOrder = db.saleorder;
const Rating = db.rating;
const User = db.user;

const Op = db.Sequelize.Op;

exports.getProductTemplete = async (req, res) => {
  try {
    let data = await ProductTemplate.findAll({
      attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description', 'category_id'],
    })

    res.status(200).send({
      success: true,
      items: data,
    })

  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }

}


exports.getTrendingProduct = async (req, res) => {
  try {

    const data = await SaleOrder.findAll({
      attributes: ['template_id'],
      group: ['template_id'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('template_id')), 'DESC']],
      limit: 12,
    });

    const templateIds = data.map(item => item.template_id);
    const products = await ProductTemplate.findAll({
      where: {
        id: {
          [Op.in]: templateIds,
        },
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No trending products found',
      });
    }



    res.status(200).send({
      success: true,
      items: products,
    });

  } catch (error) {
    console.error('Error fetching trending products:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};


exports.searchProduct = async (req, res) => {
  const searchTerm = req.params.product;

  try {
    // Search for products where the name matches the search term (case-insensitive)
    let data = await ProductTemplate.findAll({
      attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description', 'category_id'],
      where: {
        name: {
          [Op.like]: `%${searchTerm}%` // Use LIKE for partial match
        }
      }
    });

    res.status(200).send({
      success: true,
      items: data,
    });

  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getProductTempleteByCategory = async (req, res) => {
  try {
    let data = await ProductTemplate.findAll({
      where: {
        category_id: req.params.id
      },
      attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description', 'category_id'],
    })

    res.status(200).send({
      success: true,
      items: data,
    })

  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }

}



exports.getProductSingleVariant = async (req, res) => {
  try {
    let data = await ProductVariant.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description', 'category_id', 'template_id'],
      include: [
        {
          model: ProductAttribute,
          attributes: ['name', 'value'],
        },
      ],

    })

    res.status(200).send({
      success: true,
      items: [data]

    })

  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }

}



exports.getProductVariant = async (req, res) => {
  try {
    let data = await ProductVariant.findAll({
      where: {
        template_id: req.params.id,
      },
      attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description', 'category_id', 'template_id'],
      include: [
        {
          model: ProductAttribute,
          attributes: ['name', 'value'],
        },
        {
          model: Rating,
          attribute: ['id', 'star', 'comment'],
          include: [
            {
              model: User,
              attributes: ['id', 'first_name', 'last_name']
            }
          ]
        }
      ],
    })


    let attribute = await ProductAttribute.findAll({
      attributes: ['name', 'value'],
      where: {
        templete_id: req.params.id,
      },
    })


    const groupedData = attribute.reduce((acc, { name, value }) => {
      const existingAttribute = acc.find(attr => attr.name === name);
      if (existingAttribute) {
        if (!existingAttribute.value.includes(value)) {
          existingAttribute.value.push(value);
        }
      } else {
        acc.push({ name, value: [value] });
      }
      return acc;
    }, []);

    res.status(200).send({
      success: true,
      attribute: groupedData,
      items: data

    })

  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }

}



function generateProductVariants(attributes) {
  const variants = [];

  function generateVariantsHelper(index, currentVariant) {
    if (index === attributes.length) {
      variants.push({ ...currentVariant });
      return;
    }

    const currentAttribute = attributes[index];

    for (const value of currentAttribute.value) {
      currentVariant[currentAttribute.name] = value;
      generateVariantsHelper(index + 1, currentVariant);
    }
  }

  generateVariantsHelper(0, {});

  return variants;
}


exports.createProduct = async (req, res) => {

  try {

    let variant;
    if (req.body.attribute) {
      variant = generateProductVariants(req.body.attribute);
    }

    await ProductTemplate.create({
      acitve: 1,
      sequence: "10",
      category_id: req.body.category_id,
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.image_url,
      price: req.body.price,
      standard_price: req.body.standerd_price,
      sku: "MFOO1",
      product_type: true,
    })



    const productTempleteId = await ProductTemplate.findOne({
      attributes: ['id'],
      order: [['id', 'DESC']],
    });


    for (let i = 0; i < variant.length; i++) {
      let keys = Object.keys(variant[i]);
      let values = Object.values(variant[i])

      await ProductVariant.create({
        acitve: 1,
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        standard_price: req.body.standerd_price,
        sku: "MFOO1",
        description: req.body.description,
        category_id: 1,
        template_id: productTempleteId.id,
        product_type: true,
      });


      const ProductVariantId = await ProductVariant.findOne({
        attributes: ['id'],
        order: [['id', 'DESC']],
      });


      for (let j = 0; j < keys.length; j++) {
        await ProductAttribute.create({
          acitve: true,
          variant_id: ProductVariantId.id,
          templete_id: productTempleteId.id,
          name: keys[j],
          value: values[j]
        })
      }
    }

    res.status(200).send({
      success: true,
      message: "Product Create Successfully"
    })

  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }

}

exports.DeleteProductTemplate = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedCount = await ProductTemplate.destroy({
      where: { id: id }
    });

    if (deletedCount > 0) {
      res.status(200).send({
        success: true,
        message: `ProductTemplate with id ${id} deleted successfully.`,
      });
    } else {
      res.status(404).send({
        success: false,
        message: `No ProductTemplate found with id ${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
