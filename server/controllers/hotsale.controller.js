const db = require("../models");
const HotSale = db.hotsale;
const ProductTemplate = db.productTemplete;
const Op = db.Sequelize.Op;






exports.getHotSale = async (req, res) => {
    try {
        let data = await HotSale.findAll({
            attributes: ['id', 'template_id'],
            include: [
              {
                model: ProductTemplate,
                attributes: null, 
              },
            ],
      
        });
        res.status(200).send({
            success: true,
            items: data
        });

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}





exports.CreateHotSale = async (req, res) => {
    try {
        await HotSale.create({
            template_id: req.body.template_id,
        });

        res.status(200).send({
            success: true,
            message: "Create HotSale Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.updateHotSale = async (req, res) => {
    try {
        const { id} = req.body;
        
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }

        
        const [updatedRowsCount] = await HotSale.update(
            { id: id }, 
            { where: { id: id } } 
        );

        if (updatedRowsCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Order not found or status is already the same."
            });
        }

        res.status(200).send({
            success: true,
            message: `Updated successfully`,
        });

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

exports.DeleteHotsale = async (req, res) => {

    try {
        await HotSale.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "HotSale Delete Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}