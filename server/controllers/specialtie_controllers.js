const db = require("../models");
const Specialtie = db.specialtie;



exports.GetSpecialtie = async (req, res) => {
    try {
        let data = await Specialtie.findAll({
            attributes: ['id', 'name', 'type'],
        })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}



exports.CreateSpecialtie = async (req, res) => {
    try {
        await Specialtie.create({
            active: true,
            name: req.body.name,
            type: req.body.type,
            user_id: req.body.user_id
        });

        res.status(200).send({
            success: true,
            message: "Create Specialtie Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.DeleteState = async (req, res) => {

    try {
        await Specialtie.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "Specialtie Delete Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}