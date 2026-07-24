const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;


async function someAsyncOperation(rules) {
    let roleId;

    if (rules) {
        if (rules[0] === "admin") {
            roleId = 2;
        } else if (rules[0] === "superadmin") {
            roleId = 3;
        } else if (rules[0] === "modarator") {
            roleId = 4;
        } else {
            roleId = 1;
        }
    }
    return roleId
}

const RoleSetup = async (rules, userId) => {
    if (!rules) return;
    for (const item of rules) {
        await Role.create({
            name: item.name,
            user_id: userId
        });
    }
};


exports.singUp = async (req, res) => {
    const body = req.body;
    try {
        const data = await User.findOne({
            where: {
                [Op.or]: [
                    { username: req.body.username },
                    { email: req.body.email },
                ],
            },
        })

        if (data) {
            return res.status(204).send({
                success: true,
                message: "User Already exist",
            })
        }

        await User.create({
            active: 1,
            name: req.body.name,
            user_type: req.body.user_type,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            image_url: req.body.image_url,
            dept_id: req.body.dept_id,
            address_id: req.body.address_id
        });


        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        await RoleSetup(req?.body?.roles, user?.id);


        res.status(200).send({
            success: true,
            message: "Registration Successfull",
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}


exports.singIn = async (req, res) => {
    console.log(req.body.username)
    try {
        const data = await User.findOne({
            where: {
                [Op.or]: [
                    { username: req.body.username },
                    { email: req.body.username },
                ],
            },
        })

        if (!data) {
            return res.status(404).send({ success: false, message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            data.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }


        const token = jwt.sign({ id: data.id }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            id: req.userId,
            accessToken: token,
            name: data?.name,
            image: data?.image_url,
            role: 'admin',
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}


exports.getUsers = async (req, res) => {
    try {
        const data = await User.findAll({
            include: [{
                model: Role,
                as: 'roles'
            }],
            limit: 30
        })
        res.status(200).send({
            success: true,
            items: data,
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.getSingleUsers = async (req, res) => {
    try {
        const data = await User.findOne({
            include: [{
                model: db.department,
                as: 'department'
            },
            {
                model: db.address,
                as: 'address',
                include: [
                    {
                        model: db.division,
                        as: 'division'
                    },
                    {
                        model: db.distric,
                        as: 'district'
                    },
                    {
                        model: db.upazila,
                        as: 'upazila'
                    }
                ]
            },
            {
                model: db.degree,
                as: 'degrees'
            },
            {
                model: db.role,
                as: 'roles'
            }],
            where: {
                id: req.params.id
            }
        })
        const role = await Role.findAll({})
        const address = await db.address.findAll({})
        const exactUser = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send({
            success: true,
            items: data,
            role: role,
            address: address,
            exactUser: exactUser
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

}

exports.updateUsers = async (req, res) => {

    try {

        await User.update(req.body.user,
            { where: { id: req.body.user?.id } }
        );
        res.status(200).send({
            success: true,
            message: "Update Successfulll",
        });

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


