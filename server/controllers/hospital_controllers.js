const db = require("../models");
const Hospital = db.hospital;

const Op = db.Sequelize.Op;



exports.GetHospital = async (req, res) => {
    try {
        let data = await Hospital.findAll({})
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}





exports.CreateHospital = async (req, res) => {
    try {
        await Hospital.create({
            active: true,
            name: req.body.name,
            image_url: req.body.image_url,
            division_id: req.body.division_id,
            district_id: req.body.district_id,
            upazila_id: req.body.upazila_id,
            address: req.body.address,
            doctor_ids: req.body.doctor_ids,
            phone: req.body.phone,
            email: req.body.email
        });

        res.status(200).send({
            success: true,
            message: "Create Category Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.updateHospital = async (req, res) => {
    try {
        const { id, name, image_url } = req.body;

        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }


        const [updatedRowsCount] = await Hospital.update(
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

exports.DeleteHospital = async (req, res) => {

    try {
        await Hospital.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "Hospital Delete Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}