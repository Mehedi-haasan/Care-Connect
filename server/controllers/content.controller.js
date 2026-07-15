const { where } = require("sequelize");
const db = require("../models");
const Content = db.content;



exports.GetContent = async (req, res) => {
    try {
        let data = await Content.findAll({
            include: [
                {
                    model: db.category,
                    as: "category",
                    attributes: ["id", "name"],
                },
                {
                    model: db.sub_category,
                    as: "sub_category",
                    attributes: ["id", "name"],
                },
                {
                    model: db.content_type,
                    as: "type",
                    attributes: ["id", "name"],
                },
                {
                    model: db.user,
                    as: "creator",
                    attributes: ["id", "name"],
                }
            ],
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


exports.GetSingleContent = async (req, res) => {
    try {
        let data = await Content.findAll({
            include: [
                {
                    model: db.category,
                    as: "category",
                    attributes: ["id", "name"],
                },
                {
                    model: db.sub_category,
                    as: "sub_category",
                    attributes: ["id", "name"],
                },
                {
                    model: db.content_type,
                    as: "type",
                    attributes: ["id", "name"],
                },
                {
                    model: db.user,
                    as: "creator",
                    attributes: ["id", "name"],
                }
            ],
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



exports.CreateContent = async (req, res) => {
    try {
        // Destructure only the fields that exist in your Content model
        const {
            active,
            sequence,
            category_id,
            sub_cate_id,
            name,
            title,
            description,
            image_url,
            price,
            standard_price,
            sku,
            type_id,
            creator_id
        } = req.body;

        // Create the content record
        const newContent = await Content.create({
            active: active ?? true,              // default to true if not provided
            sequence: sequence ?? 0,             // default sequence
            category_id,
            sub_cate_id,
            name,
            title,
            description,
            image_url,
            price,
            standard_price,
            sku,
            type_id,
            creator_id
        });

        res.status(201).json({
            success: true,
            message: "Content created successfully",
            data: newContent
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


