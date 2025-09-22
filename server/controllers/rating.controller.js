const db = require("../models");
const Rating = db.rating;


const Op = db.Sequelize.Op;



exports.getRating = async (req, res) => {
    try {
        let data = await Rating.findAll()
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}





exports.CreateRating = async (req, res) => {
    try {
        await Rating.create({
            userId: req.userId,
            product_id: req.body.product_id,
            star:req.body.star,
            comment : req.body.comment
        });

        res.status(200).send({
            success: true,
            message: "Create Rating Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.updateRating = async (req, res) => {
    try {
        const { id, star, comment } = req.body;

        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }


        const [updatedRowsCount] = await Rating.update(
            { star: star, comment: comment },
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

exports.DeleteRating = async (req, res) => {

    try {
        await Rating.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "Rating Delete Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}