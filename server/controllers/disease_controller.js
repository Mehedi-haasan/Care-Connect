const db = require("../models");
const Disease = db.disease;



exports.GetDisease = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const pageSize = parseInt(req.params.pageSize) || 10;

        const offset = (page - 1) * pageSize;

        const { count, rows } = await Disease.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [["id", "DESC"]],
        });

        res.status(200).send({
            success: true,
            items: rows,
            total: count,
            page: page,
            pageSize: pageSize,
            totalPages: Math.ceil(count / pageSize),
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};




exports.CreateDisease = async (req, res) => {
    try {
        await Disease.create({
            active: 1,
            sequence: req.body.sequence,
            name: req.body.name,
            image_url: req.body.image_url
        });

        res.status(200).send({
            success: true,
            message: "Create Category Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}


exports.UpdateDisease = async (req, res) => {
    try {
        const { id, name, image_url } = req.body;

        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }


        const [updatedRowsCount] = await Disease.update(
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
}

exports.DeleteDisease = async (req, res) => {

    try {
        await Disease.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "Disease Delete Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}