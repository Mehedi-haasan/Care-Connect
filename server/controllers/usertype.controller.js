const { where } = require("sequelize");
const db = require("../models");
const UserType = db.usertype;

// CREATE a new User Type
exports.createUserType = async (req, res) => {
    try {
        const { name } = req.body;

        // Validation: name is required (also enforced by allowNull: false in model)
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "User type name is required"
            });
        }

        await UserType.create({
            name: name.trim()
        });

        res.status(201).json({
            success: true,
            message: "User type created successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create user type",
            error: error.message
        });
    }
};

// GET all User Types
exports.getAllUserTypes = async (req, res) => {
    try {
        const userTypes = await UserType.findAll({
            order: [['name', 'ASC']], // sorted alphabetically
            attributes: ['id', 'name']
        });

        res.status(200).json({
            success: true,
            count: userTypes.length,
            data: userTypes
        });

    } catch (error) {
        console.error("Error fetching user types:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user types",
            error: error.message
        });
    }
};

// Optional: GET single User Type by ID
exports.getUserTypeById = async (req, res) => {
    try {
        const { id } = req.params;

        const userType = await UserType.findByPk(id);

        if (!userType) {
            return res.status(404).json({
                success: false,
                message: "User type not found"
            });
        }

        res.status(200).json({
            success: true,
            data: userType
        });

    } catch (error) {
        console.error("Error fetching user type:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user type",
            error: error.message
        });
    }
};