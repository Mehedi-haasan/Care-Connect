const { where } = require("sequelize");
const db = require("../models");
const Content = db.content;
const ContentType = db.content_type;



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
                    attributes: ["id", "name", "designation"],
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


exports.GetContentCateWise = async (req, res) => {
    try {
        let cate = await ContentType.findAll({
            include: [
                {
                    model: db.content,
                    as: "contents",
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
                            attributes: ["id", "name", "designation"],
                        }
                    ],
                    limit: 6
                }]
        })

        res.status(200).send({
            success: true,
            items: cate
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

exports.GetContentCategoryWise = async (req, res) => {
    const id = parseInt(req.params.cat_id, 10)
    try {
        let data = await Content.findAll({
            where: {
                type_id: id
            },
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
                    attributes: ["id", "name", "designation"],
                }
            ],
            limit: 20
        })

        let category = await db.content_type.findOne({
            where: {
                id: id
            }
        })

        res.status(200).send({
            success: true,
            items: data,
            category: category
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


exports.GetCommonContent = async (req, res) => {
    try {
        let category = await db.category.findAll({})
        let sub_category = await db.sub_category.findAll({})
        let content_type = await db.content_type.findAll({})
        let users = await db.user.findAll({})
        res.status(200).send({
            success: true,
            category: category,
            sub_category: sub_category,
            content_type: content_type,
            users: users
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


exports.GetSingleContent = async (req, res) => {
    try {
        let data = await Content.findOne({
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

        let related_data = await Content.findAll({
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
                category_id: data?.category?.id
            }
        })
        res.status(200).send({
            success: true,
            items: data,
            related_data: related_data
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


exports.UpdateContent = async (req, res) => {
    try {
        let content = await Content.update(req.body.content, { where: { id: req?.body?.content?.id } });

        res.status(201).json({
            success: true,
            message: "Content update successfully",
            data: content
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

