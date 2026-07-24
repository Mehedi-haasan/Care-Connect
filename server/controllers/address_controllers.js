const db = require("../models");
const Address = db.address;


const Op = db.Sequelize.Op;



exports.GetAddress = async (req, res) => {
    try {
        let data = await Address.findAll({})
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}




exports.CreateAddress = async (req, res) => {

    try {
        await Address.create({
            name: req.body.name,
            address_type: req.body.address_type,
            division_id: req.body.division_id,
            district_id: req.body.district_id,
            upazila_id: req.body.upazila_id,
            user_id:req.body.user_id
        });

        res.status(200).send({
            success: true,
            message: "Create Category Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.UpdateAddress = async (req, res) => {
    try {
        const { id, name, image_url } = req.body;

        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }


        const [updatedRowsCount] = await Address.update(
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

exports.DeleteAddress = async (req, res) => {

    try {
        await Address.destroy({
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