const { where } = require("sequelize");
const db = require("../models");
const Message = db.carousel;



exports.getMessage = async (req, res) => {
    try {
        let data = await Message.findAll({
            where:{
                userId: req.userId
            },
            attributes: ['id', 'first_name', 'last_name', 'email','phone','message'],
        })
        res.status(200).send({
            success: true,
            items: data
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}





exports.CreateMessage = async (req, res) => {
    const [fname,lname,email,phone,message]= req.body;
    try {
        await Message.create({
            first_name: fname,
            last_name: lname,
            phone:phone,
            email:email,
            message:message
        });

        res.status(200).send({
            success: true,
            message: "Message sent Successfully"
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}


