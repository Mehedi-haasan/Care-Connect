const db = require("../models");
const Division = db.division;
const Op = db.Sequelize.Op;



exports.GetDivision = async (req, res) => {
    try {
        let data = await Division.findAll({
            attributes: ['id', 'name', 'charge'],
        })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}



exports.CreateDivision = async (req, res) => {
    try {
        await Division.create({
            name: req.body.name,
            charge: req.body.charge
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