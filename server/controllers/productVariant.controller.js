const db = require("../models");
const ProductVariant = db.productVariant;


exports.getVariant = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await ProductVariant.findOne({
            where: {
                id: id
            }
        })
        res.status(200).send({
            success: true,
            items: data

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internar server error",


        })
    }

}

exports.UpdateVariant = async (req, res) => {
    const { name, standard_price, price, id, description, category_id, template_id } = req.body;
    const image_url = req.file;

    // Cleaned up the values object
    const values = {
        active: true,
        name: name,
        image_url: `http://localhost:8050/uploads/${image_url.filename}`,
        price: price,
        standard_price: standard_price,
        sku: 'MF',
        description: description,
        category_id: category_id,
        template_id: template_id,
        product_type: true
    };
    
    console.log(values); // Logging the values to ensure they're correct

    try {
        const result = await ProductVariant.update(values, {
            where: {
                id: id // Ensure this is the correct ID being passed
            }
        });

        // Check if the update actually modified any rows
        if (result[0] === 0) {
            return res.status(404).send({
                success: false,
                message: "Variant not found or no changes made",
            });
        }

        res.status(200).send({
            success: true,
            message: "Variant updated successfully",
        });
    } catch (error) {
        console.error('Update Error:', error); // Log the error for debugging
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}

