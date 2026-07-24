const { where } = require("sequelize");
const db = require("../models");
const ContentType = db.content_type;



exports.GetContentType = async (req, res) => {
    try {
        let data = await ContentType.findAll({
            limit: 20
        })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


exports.GetSingleContentType = async (req, res) => {
    try {
        let data = await ContentType.findOne({

            where: {
                id: req.params.id
            }
        })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}



exports.CreateContentType = async (req, res) => {
    try {
        await ContentType.create({
            active: 1,
            sequence: req.body.sequence ?? 0,
            image_url: req.body.image_url,
            name: req.body.name
        });

        res.status(201).json({
            success: true,
            message: "Content created successfully",

        });

    } catch (error) {
        console.error("Error creating content:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create content",
            error: error.message
        });
    }
};


exports.UpdateContentType = async (req, res) => {
    try {
        const { id, sequence, image_url, name, active } = req.body;

        const [updatedRows] = await ContentType.update(
            {
                sequence: sequence ?? 0,
                image_url,
                name,
                active
            },
            {
                where: { id }
            }
        );

        if (updatedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Content not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Content updated successfully"
        });

    } catch (error) {
        console.error("Error updating content:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update content",
            error: error.message
        });
    }
};


