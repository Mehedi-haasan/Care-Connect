const db = require("../models");
const State = db.state;
const Op = db.Sequelize.Op;



exports.getState = async (req, res) => {
    try {
        let data = await State.findAll({
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



exports.CreateState = async (req, res) => {
    try {
        await State.create({
            name: req.body.name,
            charge: req.body.charge
        });

        res.status(200).send({
            success: true,
            message: "Create state Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.DeleteState = async (req, res) => {

    try {
        await State.destroy({
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