const db = require("../models");
const Hospital = db.hospital;

const Op = db.Sequelize.Op;



exports.GetHospital = async (req, res) => {
    try {
        let data = await Hospital.findAll({
            include: [
                {
                    model: db.division,
                    as: "division"
                },
                {
                    model: db.distric,
                    as: "district"
                },
                {
                    model: db.upazila,
                    as: "upazila"
                },
                {
                    model: db.user,
                    as: "doctors"
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


exports.GetJustHospital = async (req, res) => {
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


exports.GetSingleHospital = async (req, res) => {
    try {
        let data = await Hospital.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: db.division,
                    as: "division"
                },
                {
                    model: db.distric,
                    as: "district"
                },
                {
                    model: db.upazila,
                    as: "upazila"
                },
                {
                    model: db.user,
                    as: "doctors"
                }
            ]
        })

        const allDoctors = await db.user.findAll({
            attributes: ['id', 'name']
        });

        data.setDataValue("allDoctors", allDoctors);

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
        const { id, active, name, image_url, address, district_id, division_id, upazila_id, phone, email } = req.body;

        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }


        const [updatedRowsCount] = await Hospital.update({
            id: id,
            active: active,
            name: name,
            address: address,
            image_url: image_url,
            district_id: district_id,
            division_id: division_id,
            upazila_id: upazila_id,
            phone: phone,
            email: email
        }, { where: { id: id } });

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