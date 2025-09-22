const db = require("../models");
const ProductVariant = db.productVariant;
const ProductAttribute = db.ProductAttribute;
const SaleOrderLine = db.saleorderlines;
const SaleOrder = db.saleorder;
const State = db.state;

const Op = db.Sequelize.Op;






exports.getCartProduct = async (req, res) => {
    try {

        let data = await SaleOrderLine.findAll({
            where: {
                userId: req.userId,
            },
            attributes: ['id', 'qty'],
            include: [
                {
                    model: ProductVariant,
                    attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description'],
                    include: [
                        {
                            model: ProductAttribute,
                            attributes: ['name', 'value'],
                        },
                    ],
                },
            ],

        })

        let totalPrice = 0;
        data.forEach(variant => {
            totalPrice += variant.product_product.standard_price * variant.qty;
        });

        res.status(200).send({
            success: true,
            items: data,
            price: totalPrice,

        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}


exports.getCartProduct = async (req, res) => {
    try {

        let data = await SaleOrderLine.findAll({
            where: {
                userId: req.userId,
            },
            attributes: ['id', 'qty'],
            include: [
                {
                    model: ProductVariant,
                    attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description'],
                    include: [
                        {
                            model: ProductAttribute,
                            attributes: ['name', 'value'],
                        },
                    ],
                },
            ],

        })

        let totalPrice = 0;
        data.forEach(variant => {
            totalPrice += variant.product_product.standard_price * variant.qty;
        });

        res.status(200).send({
            success: true,
            items: data,
            price: totalPrice,

        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}
exports.getOrder = async (req, res) => {
    try {

        let data = await SaleOrder.findAll({
            include: [
                {
                    model: ProductVariant,
                    attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description'],
                    include: [
                        {
                            model: ProductAttribute,
                            attributes: ['name', 'value'],
                        },
                    ],
                },
            ],
        })

        res.status(200).send({
            success: true,
            items: data,
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}
exports.SingleOrder = async (req, res) => {
    const id = req.params.id;
    try {
        let data = await SaleOrder.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: ProductVariant,
                    attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description'],
                    include: [
                        {
                            model: ProductAttribute,
                            attributes: ['name', 'value'],
                        },
                    ],
                },
            ],
        })

        res.status(200).send({
            success: true,
            items: [data],
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.userOrder = async (req, res) => {
    const id = req.userId;
    try {

        let data = await SaleOrder.findAll({
            where: {
                userId: id
            },
            include: [
                {
                    model: ProductVariant,
                    attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description'],
                    include: [
                        {
                            model: ProductAttribute,
                            attributes: ['name', 'value'],
                        },
                    ],
                },
            ],
        })

        res.status(200).send({
            success: true,
            items: data,
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.updateOrder = async (req, res) => {
    try {
        const { id, status } = req.body;

        // Ensure that both id and status are provided
        if (!id || !status) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }

        // Update the status of the order with the specified id
        const [updatedRowsCount] = await SaleOrder.update(
            { status: status }, // Set the new status
            { where: { id: id } } // Specify the order to update
        );

        if (updatedRowsCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Order not found or status is already the same."
            });
        }

        res.status(200).send({
            success: true,
            message: `Order with ID ${id} successfully updated to status '${status}'.`,
        });

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};




exports.getProductVariant = async (req, res) => {
    try {
        let data = await ProductVariant.findAll({
            where: {
                category_id: req.params.id,
            },
            attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description', 'category_id', 'template_id'],
            include: [
                {
                    model: ProductAttribute,
                    attributes: ['name', 'value'],
                },
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



exports.AddToCart = async (req, res) => {

    try {
        await SaleOrderLine.create({
            acitve: 1,
            product_id: req.body.id,
            qty: req.body.qty,
            userId: req.userId
        })

        res.status(200).send({
            success: true,
            message: "Product Add Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}



exports.PlaceOrder = async (req, res) => {
    try {
        let OrderData = [];

        if (!req.body.name) {
            res.status(200).send({
                success: true,
                message: "Request body can not be empty"
            });
        }

        const state = await State.findOne({
            attributes: ['id', 'name', 'charge'],
            where: {
                id: req.body.state
            }
        });

        let cartData = await SaleOrderLine.findAll({
            where: {
                userId: req.userId
            },
            include: [
                {
                    model: ProductVariant,
                    attributes: ['id', 'name', 'image_url', 'price', 'standard_price','template_id'],
                    include: [
                        {
                            model: ProductAttribute,
                            attributes: ['name', 'value'],
                        },
                    ],
                },
            ],
        })


        cartData.forEach(item => {
            OrderData.push({
                product_id: item.product_product.id,
                template_id:item.product_product.template_id,
                price: item.product_product.price,
                userId: req.userId,
                name: req.body.name,
                state: state.name,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                charge: state.charge,
                qty: item.qty,
                coupon: req.body.coupon,
                note: req.body.note,
                status: "Pending"
            });
        });



        let buyNowData = await ProductVariant.findOne({
            where: {
                id: req.body.paramsId,
            },
            attributes: ['id', 'name', 'image_url', 'price', 'standard_price', 'description', 'category_id', 'template_id'],
            include: [
                {
                    model: ProductAttribute,
                    attributes: ['name', 'value'],
                },
            ],

        })


        OrderData.push({
            product_id: buyNowData.id,
            template_id:buyNowData.template_id,
            price: buyNowData.price,
            userId: req.userId,
            name: req.body.name,
            state: state.name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            charge: state.charge,
            qty: req.body.qty,
            coupon: req.body.coupon,
            note: req.body.note,
            status: "Pending"
        });



        // const product_ids = req.body.product_id;
        // const variants = await Promise.all(product_ids.map(async (id) => {
        //     return await ProductVariant.findOne({
        //         where: {
        //             id: id
        //         }
        //     });
        // }));


        // let totalPrice = 0;
        // variants.forEach(variant => {
        //     totalPrice += variant.standard_price;
        // });






        // Create SaleOrder
        await SaleOrder.bulkCreate(OrderData);


        res.status(200).send({
            success: true,
            message: "Order Placed Successfully"
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

exports.DeleteCartItem = async (req, res) => {

    try {
        await SaleOrderLine.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "Product Delete Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}