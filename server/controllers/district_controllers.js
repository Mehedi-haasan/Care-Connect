const db = require("../models");
const District = db.distric;
const Op = db.Sequelize.Op;



exports.GetDistrict = async (req, res) => {
    try {
        let data = await District.findAll({
            attributes: ['id', 'name','createdAt'],
            include: [
                {
                    model: db.upazila,
                    as: "upazilas",
                    attributes: ["id", "name"],
                }
            ]
        });
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.GetJustDistrict = async (req, res) => {
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


exports.CreateDistrict = async (req, res) => {
    try {
        await District.create({
            name: req.body.name,
            division_id: req.body.division_id
        });

        res.status(200).send({
            success: true,
            message: "Create Division Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.DeleteDivision = async (req, res) => {

    try {
        await Division.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "Division Delete Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}