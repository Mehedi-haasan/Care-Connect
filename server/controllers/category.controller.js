const db = require("../models");
const Category = db.category;



exports.getCategory = async (req, res) => {
    try {
        let data = await Category.findAll({
            limit:12,
            attributes: ['id', 'name', 'image_url'],
        })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}



exports.CreateCategory = async (req, res) => {
    try {
        await Category.create({
            name: req.body.name,
            image_url: req.body.image_url,
            parent_id:req.body.parent_id
        });

        res.status(200).send({
            success: true,
            message: "Create Category Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}


exports.updateCategory = async (req, res)=>{
    try {
        const { id, name,image_url } = req.body;
        
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }

        
        const [updatedRowsCount] = await Category.update(
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

exports.DeleteCategory = async (req, res) => {

    try {
        await Category.destroy({
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