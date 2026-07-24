const db = require("../models");
const Upazila = db.upazila;
const Op = db.Sequelize.Op;



exports.GetUpazila = async (req, res) => {
    try {
        let data = await District.findAll({
            attributes: ['id', 'name','createdAt'],
        });
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}



exports.CreateUpazila = async (req, res) => {
    try {
        await Upazila.create({
            name: req.body.name,
            district_id: req.body.district_id
        });

        res.status(200).send({
            success: true,
            message: "Create Division Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.DeleteUpazila = async (req, res) => {

    try {
        await Upazila.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "Upazila Delete Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}