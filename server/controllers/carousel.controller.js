const db = require("../models");
const Carousel = db.carousel;


const Op = db.Sequelize.Op;



exports.getCarousel = async (req, res) => {
    try {
        let data = await Carousel.findAll({
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





exports.CreateCarousel = async (req, res) => {
    console.log(req.body.name, req.body.image_url, "carousbfy cj ruwgafcjhwesg dwaefgy");
    try {
        await Carousel.create({
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

exports.updateCarousel = async (req, res) => {
    try {
        const { id, name,image_url } = req.body;
        
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Order ID and status are required."
            });
        }

        
        const [updatedRowsCount] = await Carousel.update(
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

exports.DeleteCarousel = async (req, res) => {

    try {
        await Carousel.destroy({
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