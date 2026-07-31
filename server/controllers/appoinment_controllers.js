const db = require("../models");
const Appoinment = db.carousel;


const Op = db.Sequelize.Op;



exports.GetAppoinment = async (req, res) => {
    try {
        let data = await Appoinment.findAll({ })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}





exports.CreateAppoinment = async (req, res) => {
    try {
        await Appoinment.create({
            name: req.body.name,
            image_url: req.body.image_url
        });

        res.status(200).send({
            success: true,
            message: "Create Category Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.UpdateAppoinment = async (req, res) => {
    try {
        const { id, name,image_url } = req.body;
        
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }

        
        const [updatedRowsCount] = await Appoinment.update(
            { name: name, image_url: image_url }, 
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

exports.DeleteAppoinment = async (req, res) => {

    try {
        await Appoinment.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "State Delete Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}