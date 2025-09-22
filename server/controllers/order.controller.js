const db = require("../models");
const SaleOrder = db.saleorder;
const ProductVariant = db.productVariant
const ProductAttribute = db.ProductAttribute;
const Op = db.Sequelize.Op;



exports.getOrder = async (req, res) => {
    try {
        let data = await SaleOrder.findAll({
            limit: 50,
            include: [
                {
                    model: ProductVariant,
                    include: [
                        {
                            model: ProductAttribute,
                            attributes: ['name', 'value']
                        }
                    ]
                }
            ]
        })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}





exports.getUserOrder = async (req, res) => {
    try {
        let data = await SaleOrder.findAll({
            where: {
                userId: req.userId
            },
            include: [
                {
                    model: ProductVariant,
                    include: [
                        {
                            model: ProductAttribute,
                            attributes: ['name', 'value']
                        }
                    ]
                }
            ]
        })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

exports.getInstantOrder = async (req, res) => {
    try {
        let data = await SaleOrder.findAll({
            where: {
                tran_id: req.params.tran_id
            },
            include: [
                {
                    model: ProductVariant,
                    include: [
                        {
                            model: ProductAttribute,
                            attributes: ['name', 'value']
                        }
                    ]
                }
            ]
        })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


// exports.updateCarousel = async (req, res) => {
//     try {
//         const { id, name, image_url } = req.body;

//         if (!id) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Order ID and status are required."
//             });
//         }


//         const [updatedRowsCount] = await Carousel.update(
//             { name: name, image_url: image_url },
//             { where: { id: id } }
//         );

//         if (updatedRowsCount === 0) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Order not found or status is already the same."
//             });
//         }

//         res.status(200).send({
//             success: true,
//             message: `Updated successfully`,
//         });

//     } catch (error) {
//         res.status(500).send({ success: false, message: error.message });
//     }
// };

// exports.DeleteCarousel = async (req, res) => {

//     try {
//         await Carousel.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });

//         res.status(200).send({
//             success: true,
//             message: "State Delete Successfully"
//         })

//     } catch (error) {
//         res.status(500).send({ success: false, message: error.message });
//     }

// }