const db = require("../models");
const Appoinment = db.carousel;


const Op = db.Sequelize.Op;



exports.GetAppoinment = async (req, res) => {
    try {
        let data = await Appoinment.findAll({})
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
            active: true,
            name: req.body.name,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            emergency_number: req.body.emergency_number,
            email: req.body.email,
            running_medecine: req.body.running_medecine,
            allergic_food: req.body.allergic_food,
            previous_surgery_or_serious_illness: req.body.previous_surgery_or_serious_illness,
            appoinment_date: req.body.appoinment_date,
            appoinment_time: req.appoinment_time,
            new_patient: req.body.new_patient,
            patient_age: req.body.patient_age,
            prev_history: req.body.prev_history,
            consultation_type: req.body.consultation_type,
            duration: req.body.duration,
            is_emergency: req.body.is_emergency,
            image_url: req.body.image_url,
            reason_for_visit: req.body.reason_for_visit,
            status: req.body.status,
            attachment: req.body.attachment,
            doctor_id: req.body.doctor_id,
            patient_id: req.body.patient_id,
            payment_id: req.body.payment_id,
            hospital_id: req.body.hospital_id
        });

        res.status(200).send({
            success: true,
            message: "Create Appoinment Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.UpdateAppoinment = async (req, res) => {
    try {
        const { id, name, image_url } = req.body;

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