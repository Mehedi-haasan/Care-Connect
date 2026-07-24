const db = require("../models");
const SubCategory = db.sub_category;



exports.getSubCategory = async (req, res) => {
    try {
        let data = await SubCategory.findAll({
            limit: 12,
        })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}



exports.CreateSubCategory = async (req, res) => {
    try {
        await SubCategory.create({
            active: 1,
            sequence: req.body.sequence,
            name: req.body.name,
            image_url: req.body.image_url,
            cate_id: req.body.cate_id
        });

        res.status(200).send({
            success: true,
            message: "Create Category Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}


exports.updateSubCategory = async (req, res) => {
    try {
        const { id, name, image_url, cate_id } = req.body;

        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }


        const [updatedRowsCount] = await SubCategory.update(
            { name: name, image_url: image_url, cate_id: cate_id },
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

exports.DeleteSubCategory = async (req, res) => {

    try {
        await SubCategory.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).send({
            success: true,
            message: "Category Delete Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}